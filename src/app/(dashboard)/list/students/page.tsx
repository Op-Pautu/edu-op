import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/table-list";
import { TableSearch } from "@/components/table-search";
import { role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

type Student = {
	id: number;
	studentId: string;
	name: string;
	email?: string;
	photo: string;
	grade: number;
	class: string;
	address?: string;
	phone?: string;
};

const StudentsListPage = () => {
	const renderRow = (item: Student) => {
		return (
			<tr
				key={item.id}
				className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-opPurpleLight"
			>
				<td className="flex items-center gap-4 p-4">
					<Image
						src={item.photo}
						alt={item.name}
						width={40}
						height={40}
						className="md:hidden xl:block size-10 rounded-full object-cover"
					/>
					<div className="flex flex-col">
						<h3 className="font-semibold ">{item.name}</h3>
						<p className="text-xs text-gray-500">{item.class}</p>
					</div>
				</td>
				<td className="hidden md:table-cell">{item.studentId}</td>
				<td className="hidden md:table-cell">{item.phone}</td>
				<td className="hidden md:table-cell">{item.address}</td>
				<td className="">
					<div className="flex items-center gap-2">
						<Link href={`/list/teachers/${item.id}`}>
							<button className="flex items-center justify-center size-7 rounded-full bg-opSky">
								<Image src={"/view.png"} alt="view" width={16} height={16} />
							</button>
						</Link>
						{role === "admin" && (
							<button className="flex items-center justify-center size-7 rounded-full bg-opPurple">
								<Image
									src={"/delete.png"}
									alt="delete"
									width={16}
									height={16}
								/>
							</button>
						)}
					</div>
				</td>
			</tr>
		);
	};

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
						{role === "admin" && (
							<button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
								<Image src="/plus.png" alt="icon" width={14} height={14} />
							</button>
						)}
					</div>
				</div>
			</div>
			<TableList columns={columns} renderRow={renderRow} data={studentsData} />
			<Pagination />
		</div>
	);
};

export default StudentsListPage;
