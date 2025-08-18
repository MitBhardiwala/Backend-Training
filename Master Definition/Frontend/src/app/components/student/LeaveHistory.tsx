import { getServerSession } from "next-auth/next";
import { getUserLeaveHistory } from "@/app/lib/services/user/user.ts";
import { authOptions } from "@/app/lib/services/auth/auth.js";
import LeaveRecord from "./LeaveRecord";
import { Logs } from "lucide-react";
import { Leave } from "@/app/lib/definitions";

const LeaveHistory = async () => {
  const session = await getServerSession(authOptions);

  const leaveHistory = await getUserLeaveHistory(session.accessToken);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Leave History</h2>
      <div className="space-y-3">
        {leaveHistory.map((leave: Leave) => (
          <LeaveRecord key={leave.id} leave={leave} icon={Logs} />
        ))}
      </div>
    </div>
  );
};

export default LeaveHistory;
