import { Announcements } from "@/components/announcements";
import { AttendanceChart } from "@/components/attendance-chart";
import CountChart from "@/components/count-chart";
import { EventCalendar } from "@/components/event-calendar";
import { FinanceChart } from "@/components/finance-chart";
import { UserCards } from "@/components/user-cards";
import React from "react";

const AdminPage = () => {
	return (
		<div className="p-4 flex gap-4 flex-col md:flex-row">
			{/* Left */}
			<div className="w-full lg:w-2/3 flex flex-col gap-8">
				{/* User Cards */}
				<div className="flex gap-4 justify-between flex-wrap">
					<UserCards type="student" />
					<UserCards type="teacher" />
					<UserCards type="parent" />
					<UserCards type="staff" />
				</div>
				{/* Middle Charts */}
				<div className="flex gap-4 flex-col lg:flex-row">
					{/* Count Chart */}
					<div className="w-full lg:w-1/3 h-[450px]">
						<CountChart />
					</div>
					{/* Attendance Chart */}
					<div className="w-full lg:w-2/3 h-[450px]">
						<AttendanceChart />
					</div>
				</div>
				{/* Bottom Chart */}
				<div className="w-full h-[500px]">
					<FinanceChart />
				</div>
			</div>

			{/* Right */}
			<div className="w-full lg:w-1/3 flex flex-col gap-8">
				<EventCalendar />
				<Announcements />
			</div>
		</div>
	);
};

export default AdminPage;
