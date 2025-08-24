import { getHodStats } from "@/app/lib/services/hod/hod";
import StatsBox from "../Leave/StatsBox";
import { CircleUserRound, SquareUser, User } from "lucide-react";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/services/auth/auth";

export default async function HodDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );
  }

  const stats = await getHodStats(session.accessToken);

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Stats Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsBox
            icon={User}
            leave={stats.totalStudents}
            title="Total Students"
          />
          <StatsBox
            icon={CircleUserRound}
            leave={stats.totalFaculties}
            title="Total Faculties"
          />
          <StatsBox
            icon={SquareUser}
            leave={stats.pendingRequest}
            title="Pending Leave Request"
          />
        </div>
      </div>

      <div className="mt-4 bg-white p-5  mb-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 w-full">
          User Management
        </h2>
        <div className="flex justify-around">
          <Button variant="contained" href="/manage/Student">
            Manage students
          </Button>
          <Button variant="contained" href="/manage/Faculty">
            Manage Faculties
          </Button>
          <Button variant="contained" href="/leave-requests">
            View Leave Requests
          </Button>
        </div>
      </div>
    </>
  );
}
