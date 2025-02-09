import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/table-list";
import { TableSearch } from "@/components/table-search";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class Name",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-opPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="flex items-center justify-center size-7 rounded-full bg-opSky">
            <Image src={"/update.png"} alt="edit" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <button className="flex items-center justify-center size-7 rounded-full bg-opPurple">
            <Image src={"/delete.png"} alt="delete" width={16} height={16} />
          </button>
        )}
      </div>
    </td>
  </tr>
);

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = {};

  // URL PARAMS CONDITIONS

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;

          case "search":
            query.lesson = {
              subject: { name: { contains: value, mode: "insensitive" } },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [assignmentsData, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.assignment.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-opYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-opYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
                <Image src="/plus.png" alt="plus icon" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <TableList
        columns={columns}
        renderRow={renderRow}
        data={assignmentsData}
      />
      {/* PAGINATION */}
      <Pagination totalItems={count} currentPage={pageNumber} />
    </div>
  );
};

export default AssignmentListPage;
