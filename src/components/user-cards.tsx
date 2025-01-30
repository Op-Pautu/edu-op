import Image from "next/image";

export const UserCards = ({ type }: { type: string }) => {
	return (
		<div className="min-w-[130px] rounded-2xl odd:bg-opPurple even:bg-opYellow p-4 flex-1">
			<div className="flex justify-between items-center">
				<span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
					2025/26
				</span>
				<Image src="/more.png" alt="More" width={20} height={20} />
			</div>
			<h1 className="text-2xl font-semibold my-4">4815</h1>
			<h2 className="capitalize text-sm font-medium text-gray-500">
				{type}
				{type !== "staff" && "s"}
			</h2>
		</div>
	);
};
