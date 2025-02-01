import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/table-list";
import { TableSearch } from "@/components/table-search";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const columns = [
	{
		header: "Info",
		accessor: "info",
	},
	{
		header: "Student Names",
		accessor: "students",
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

type Parent = {
	id: number;
	name: string;
	students: string[];
	phone: string;
	email?: string;
	address: string;
};

const ParentsListPage = () => {
	const renderRow = (item: Parent) => {
		return (
			<tr
				key={item.id}
				className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-opPurpleLight"
			>
				<td className="flex items-center gap-4 p-4">
					<div className="flex flex-col">
						<h3 className="font-semibold ">{item.name}</h3>
						<p className="text-xs text-gray-500">{item.email}</p>
					</div>
				</td>
				<td className="hidden md:table-cell">{item.students.join(", ")}</td>
				<td className="hidden md:table-cell">{item.phone}</td>
				<td className="hidden md:table-cell">{item.address}</td>
				<td className="">
					<div className="flex items-center gap-2">
						<Link href={`/list/teachers/${item.id}`}>
							<button className="flex items-center justify-center size-7 rounded-full bg-opSky">
								<Image src={"/edit.png"} alt="edit" width={16} height={16} />
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
				<h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
			<TableList columns={columns} renderRow={renderRow} data={parentsData} />
			<Pagination />
		</div>
	);
};

export default ParentsListPage;
