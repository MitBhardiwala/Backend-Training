"use client";
import { getHodStats } from "@/app/lib/services/hod/hod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatsBox from "../Leave/StatsBox";
import { CircleUserRound, Clock9, SquareUser, User } from "lucide-react";
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
      if (session) {
        try {
          const respone = await getHodStats(session.accessToken);
          setStats(respone);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchStats();
  }, []);

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

      <Button variant="contained" href="/manage-students">
        Manage students
      </Button>
      <Button variant="contained" href="/manage-faculties">
        Manage Faculties
      </Button>
    </>
  );
}
