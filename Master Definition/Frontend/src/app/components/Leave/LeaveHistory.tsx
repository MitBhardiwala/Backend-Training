import LeaveRecord from "./LeaveRecord";
import { Logs } from "lucide-react";
import { LeaveRecordType } from "@/app/lib/definitions";

const LeaveHistory = ({
  leaveHistory,
}: {
  leaveHistory: LeaveRecordType[];
}) => {
  if (!leaveHistory.length) {
    return <div>No leave history found </div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Leave History</h2>
      <div className="space-y-3">
        {leaveHistory.map((leave: LeaveRecordType) => (
          <LeaveRecord key={leave.id} leave={leave} icon={Logs} />
        ))}
      </div>
    </div>
  );
};

export default LeaveHistory;
