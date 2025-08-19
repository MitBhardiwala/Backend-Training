"use client";

import { AdminStats, HodStats } from "@/app/lib/definitions";
import { getAdminStats } from "@/app/lib/services/admin/admin";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatsBox from "../Leave/StatsBox";
import { Clock9 } from "lucide-react";
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
      try {
        const respone = await getAdminStats(session.accessToken);
        setStats(respone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <>
      <div>Hod dashboard</div>;
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        <StatsBox icon={Clock9} leave={stats.totalUsers} title="Total users" />
        <StatsBox
          icon={Clock9}
          leave={stats.totalStudents}
          title="Total Students"
        />
        <StatsBox
          icon={Clock9}
          leave={stats.totalFaculty}
          title="Total Faculty"
        />
        <StatsBox icon={Clock9} leave={stats.totalHods} title="Total Hod" />
        <StatsBox
          icon={Clock9}
          leave={stats.totalDepartments}
          title="Total Departments"
        />
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
