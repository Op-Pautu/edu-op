import { Pagination } from "@/components/pagination";
import { TableSearch } from "@/components/table-search";
import Image from "next/image";
import React from "react";

const TeachersList = () => {
	return (
		<div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 border border-red-500">
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
				<div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center gap-4 self-end">
						<button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
							<Image src="/filter.png" alt="icon" width={14} height={14} />
						</button>
						<button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
							<Image src="/sort.png" alt="icon" width={14} height={14} />
						</button>
						<button className="size-8 flex  items-center justify-center rounded-full bg-opYellow">
							<Image src="/plus.png" alt="icon" width={14} height={14} />
						</button>
					</div>
				</div>
			</div>
			<div className=""></div>
			<Pagination />
		</div>
	);
};

export default TeachersList;
