import React from "react";
import { Calendar, Clock, CheckCircle, BarChart3 } from "lucide-react";
import StatsBox from "./StatsBox";
import { LeaveBalanceType } from "@/app/lib/definitions";

const LeaveBalance = ({ leaveBalance }: { leaveBalance: LeaveBalanceType }) => {
  if (!leaveBalance) {
    return (
      <div className="bg-white rounded-lg p-6 text-center text-gray-500">
        No leave details found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Leave Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsBox
          icon={Calendar}
          leave={leaveBalance.availableLeave}
          title="Available Leaves"
        />
        <StatsBox
          icon={Clock}
          leave={leaveBalance.usedLeave}
          title="Used Leaves"
        />
        <StatsBox
          icon={CheckCircle}
          leave={leaveBalance.totalLeave}
          title="Total Leaves"
        />
        <StatsBox
          icon={BarChart3}
          leave={leaveBalance.attendancePercentage}
          title="Attendance %"
        />
      </div>
    </div>
  );
};

export default LeaveBalance;