"use client";

import { AdminStats, HodStats } from "@/app/lib/definitions";
import { getAdminStats } from "@/app/lib/services/admin/admin";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatsBox from "../Leave/StatsBox";
import { CircleUserRound, Clock9, RectangleEllipsis, SquareUser, UserRoundCog, UsersRound } from "lucide-react";
import { Button } from "@mui/material";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalStudents: 0,
    totalFaculty: 0,
    totalHods: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.accessToken) return;
      try {
        const response = await getAdminStats(session.accessToken);
        setStats(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, [session]);

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
          <StatsBox icon={UserRoundCog} leave={stats.totalHods} title="Total Hod" />
          <StatsBox
            icon={RectangleEllipsis}
            leave={stats.totalDepartments}
            title="Total Departments"
          />
        </div>
      </div>

     
      <Button variant="contained" href="/manage-students">
        Manage students
      </Button> 
      <Button variant="contained" href="/manage-faculties">
        Manage Faculties
      </Button>
      <Button variant="contained" href="/manage-hods">
        Manage Hods
      </Button>
    </>
  );
}
