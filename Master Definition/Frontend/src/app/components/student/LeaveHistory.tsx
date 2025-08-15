import { getServerSession } from "next-auth/next";
import { getUserLeaveHistory } from "@/app/lib/services/user/user.ts";
import { authOptions } from "@/app/lib/services/auth/auth";
import LeaveRecord from "./LeaveRecord";
import { Logs } from "lucide-react";
import { Leave } from "@/app/lib/definitions";

const LeaveHistory = async () => {
  const session = await getServerSession(authOptions);

  const leaveHistory = await getUserLeaveHistory(session.accessToken);

  return (
    <div className="flex flex-col">
      <p>Leave history</p>
      {leaveHistory.map((leave: Leave) => (
        <LeaveRecord key={leave.id} leave={leave} icon={Logs} />
      ))}
    </div>
  );
};

export default LeaveHistory;
