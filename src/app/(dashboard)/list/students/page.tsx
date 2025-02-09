import { FormModal } from "@/components/form-modal";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/table-list";
import { TableSearch } from "@/components/table-search";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { role, studentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

type StudentList = Student & { class: Class };

const renderRow = (item: StudentList) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-opPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt={item.name}
          width={40}
          height={40}
          className="md:hidden xl:block size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold ">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name[0]}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="flex items-center justify-center size-7 rounded-full bg-opSky">
              <Image src={"/view.png"} alt="view" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const StudentsListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.StudentWhereInput = {};

  // URL PARAMS CONDITIONS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            {
              query.class = {
                lessons: {
                  some: {
                    teacherId: value,
                  },
                },
              };
            }
            break;
          case "search": {
            query.name = {
              contains: value,
              mode: "insensitive",
            };
          }
        }
      }
    }
  }

  const [studentsData, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.student.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
              <Image src="/filter.png" alt="icon" width={14} height={14} />
            </button>
            <button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
              <Image src="/sort.png" alt="icon" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      <TableList columns={columns} renderRow={renderRow} data={studentsData} />
      <Pagination totalItems={count} currentPage={pageNumber} />
    </div>
  );
};

export default StudentsListPage;
