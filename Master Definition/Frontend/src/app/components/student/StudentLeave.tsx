import { getUserLeaveDetails } from "@/app/lib/services/user/user";
import React from "react";
import { Clock9 } from "lucide-react";
import LeaveBox from "./LeaveBox";

interface MyServerComponentProps {
  userId: number;
}

const StudentLeave = async ({ userId }: MyServerComponentProps) => {
  const response = await getUserLeaveDetails(userId);

  const leaveDetails = response.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <LeaveBox
        icon={Clock9}
        leave={leaveDetails.availableLeave}
        title="Leaves Available"
      />
      <LeaveBox
        icon={Clock9}
        leave={leaveDetails.usedLeave}
        title="Leaves Used"
      />
      <LeaveBox
        icon={Clock9}
        leave={leaveDetails.totalLeave}
        title="Total Leaves"
      />
      <LeaveBox
        icon={Clock9}
        leave={leaveDetails.attendancePercentage}
        title="Attendance percentage"
      />
    </div>
  );
};

export default StudentLeave;
