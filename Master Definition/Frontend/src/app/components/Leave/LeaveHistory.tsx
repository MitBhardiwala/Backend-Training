import LeaveRecord from "./LeaveRecord";
import { FileText } from "lucide-react";
import { LeaveRecordType } from "@/app/lib/definitions";

const LeaveHistory = ({
  leaveHistory,
}: {
  leaveHistory: LeaveRecordType[];
}) => {
  if (!leaveHistory.length) {
    return (
      <div className="bg-white rounded-lg p-6 text-center text-gray-500">
        No leave history found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Leave History</h2>
      <div className="space-y-3 flex flex-col">
        {leaveHistory.map((leave: LeaveRecordType) => (
          <LeaveRecord key={leave.id} leave={leave} icon={FileText} />
        ))}
      </div>
    </div>
  );
};

export default LeaveHistory;
