import React from "react";
import { Clock9 } from "lucide-react";
import StatsBox from "./StatsBox";
import { LeaveBalanceType } from "@/app/lib/definitions";

const LeaveBalance = ({ leaveBalance }: { leaveBalance: LeaveBalanceType }) => {
  if (!leaveBalance) {
    return <div>No leave details found ...</div>;
  }

  return (
    <>
      <p>Leave Details:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <StatsBox
          icon={Clock9}
          leave={leaveBalance.availableLeave}
          title="Leaves Available"
        />
        <StatsBox
          icon={Clock9}
          leave={leaveBalance.usedLeave}
          title="Leaves Used"
        />
        <StatsBox
          icon={Clock9}
          leave={leaveBalance.totalLeave}
          title="Total Leaves"
        />
        <StatsBox
          icon={Clock9}
          leave={leaveBalance.attendancePercentage}
          title="Attendance percentage"
        />
      </div>
    </>
  );
};

export default LeaveBalance;
