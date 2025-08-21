import {
  getUserLeaveBalance,
  getUserLeaveHistory,
} from "@/app/lib/services/user/user";
import LeaveBalance from "../Leave/LeaveBalance";
import LeaveHistory from "../Leave/LeaveHistory";
import ApplyLeave from "../Leave/ApplyLeave";
import { Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/services/auth/auth";

export default async function FacultyDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );
  }

  const leaveBalance = await getUserLeaveBalance(session.accessToken);
  const leaveHistory = await getUserLeaveHistory(session.accessToken);

  return (
    <>
      <div className="space-y-6">
        <LeaveBalance leaveBalance={leaveBalance} />
        <LeaveHistory leaveHistory={leaveHistory} />
        <ApplyLeave />
        <Button variant="contained" href="/manage-students">
          Manage students
        </Button>
        <Button variant="contained" href="/leave-requests">
          View Leave Requests
        </Button>
      </div>
    </>
  );
}
