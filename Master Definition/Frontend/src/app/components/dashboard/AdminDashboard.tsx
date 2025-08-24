import { getAdminStats } from "@/app/lib/services/admin/admin";
import { getLeaveReport } from "@/app/lib/services/admin/admin";
import StatsBox from "../Leave/StatsBox";
import LeaveReport from "../Leave/LeaveReport";
import {
  CircleUserRound,
  RectangleEllipsis,
  SquareUser,
  UserRoundCog,
  UsersRound,
} from "lucide-react";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/services/auth/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );
  }

  const stats = await getAdminStats(session.accessToken);
  const leaveReportData = await getLeaveReport(session.accessToken);

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsBox
            icon={SquareUser}
            leave={stats.totalUsers}
            title="Total users"
          />
          <StatsBox
            icon={UsersRound}
            leave={stats.totalStudents}
            title="Total Students"
          />
          <StatsBox
            icon={CircleUserRound}
            leave={stats.totalFaculty}
            title="Total Faculty"
          />
          <StatsBox
            icon={UserRoundCog}
            leave={stats.totalHods}
            title="Total Hod"
          />
          <StatsBox
            icon={RectangleEllipsis}
            leave={stats.totalDepartments}
            title="Total Departments"
          />
        </div>
      </div>

      <div className="mt-4 bg-white p-5  mb-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 w-full">
          User Management
        </h2>
        <div className="flex justify-around flex-col md:flex-row md:justify-around gap-3">
          <Button variant="contained" href="/manage/Student">
            Manage students
          </Button>
          <Button variant="contained" href="/manage/Faculty">
            Manage Faculties
          </Button>
          <Button variant="contained" href="/manage/Hod">
            Manage Hods
          </Button>
        </div>
      </div>

      <LeaveReport data={leaveReportData} />
    </>
  );
}
