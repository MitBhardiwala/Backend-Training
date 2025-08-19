"use client";
import { getHodStats } from "@/app/lib/services/hod/hod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatsBox from "../Leave/StatsBox";
import { Clock9 } from "lucide-react";
import { Button } from "@mui/material";
import { HodStats } from "@/app/lib/definitions";

export default function HodDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<HodStats>({
    totalStudents: 0,
    totalFaculties: 0,
    pendingRequest: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const respone = await getHodStats(session.accessToken);
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
      <StatsBox
        icon={Clock9}
        leave={stats.totalStudents}
        title="Total Students"
      />
      <StatsBox
        icon={Clock9}
        leave={stats.totalFaculties}
        title="Total Faculties"
      />
      <StatsBox
        icon={Clock9}
        leave={stats.pendingRequest}
        title="Pending Leave Request"
      />
      <Button variant="contained" href="/manage-students">
        Manage students
      </Button>
      <Button variant="contained" href="/manage-faculties">
        Manage Faculties
      </Button>
    </>
  );
}
