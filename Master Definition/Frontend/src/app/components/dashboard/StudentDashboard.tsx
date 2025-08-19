"use client";

import {
  getUserLeaveBalance,
  getUserLeaveHistory,
} from "@/app/lib/services/user/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LeaveBalance from "../Leave/LeaveBalance";
import LeaveHistory from "../Leave/LeaveHistory";
import ApplyLeave from "../Leave/ApplyLeave";

export default function StudentDashboard() {
  const { data: session } = useSession();
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userLeaveBalance = await getUserLeaveBalance(session.accessToken);
        setLeaveBalance(userLeaveBalance);

        const userLeaveHistory = await getUserLeaveHistory(session.accessToken);
        setLeaveHistory(userLeaveHistory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [session]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="space-y-6">
          <LeaveBalance leaveBalance={leaveBalance} />
          <LeaveHistory leaveHistory={leaveHistory} />
          <ApplyLeave />
        </div>
      </div>
    </div>
  );
}
