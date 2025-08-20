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

import { Button } from "@mui/material";
import { LeaveBalanceType } from "@/app/lib/definitions";

export default function FacultyDashboard() {
  const { data: session } = useSession();
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalanceType>({
    totalLeave: 0,
    availableLeave: 0,
    usedLeave: 0,
    totalWorkingDays: 0,
    attendancePercentage: 0,
  });
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    if (session) {
    }
    const fetchDetails = async () => {
      if (session) {
        try {
          const userLeaveBalance = await getUserLeaveBalance(
            session.accessToken
          );
          setLeaveBalance(userLeaveBalance);

          const userLeaveHistory = await getUserLeaveHistory(
            session.accessToken
          );

          setLeaveHistory(userLeaveHistory);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchDetails();
  }, [session]);

  return (
    <>
      <div className="space-y-6">
        <LeaveBalance leaveBalance={leaveBalance} />
        <LeaveHistory leaveHistory={leaveHistory} />
        <ApplyLeave />
        <Button variant="contained" href="/manage-students">
          Manage students
        </Button>
      </div>
    </>
  );
}
