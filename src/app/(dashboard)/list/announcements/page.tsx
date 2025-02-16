import  FormModal from "@/components/form-modal";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/table-list";
import { TableSearch } from "@/components/table-search";
import Image from "next/image";
import { Announcement, Class, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import { getRole } from "@/lib/utils";

type AnnouncementList = Announcement & { class: Class };

const renderRow = async (item: AnnouncementList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-opPurpleLight "
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.date)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(await getRole()) === "admin" && (
          <>
            <FormModal
              table="announcement"
              type="update"
              id={item.id}
              data={item}
            />
            <FormModal table="announcement" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const role = await getRole();

  const { page, ...queryParams } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};

  // URL PARAMS CONDITIONS
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            {
              query.title = {
                contains: value,
                mode: "insensitive",
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [announcementsData, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (pageNumber - 1) * ITEMS_PER_PAGE,
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <TableList
        columns={columns}
        renderRow={renderRow}
        data={announcementsData}
      />
      {/* PAGINATION */}
      <Pagination totalItems={count} currentPage={pageNumber} />
    </div>
  );
};

export default AnnouncementListPage;
