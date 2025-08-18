import { Leave } from "@/app/lib/definitions";
import { getDaysDifference } from "@/app/lib/utils";
import { LucideProps } from "lucide-react";

interface Props {
  icon: React.FC<LucideProps>;
  leave: Leave;
}

export default function LeaveRecord({ icon: Icon, leave }: Props) {
  const duration = getDaysDifference(leave.startDate, leave.endDate);

  return (
    <div className="bg-gray-50 rounded-md p-4">
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 text-gray-600 mt-1" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {leave.reason}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                leave.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {leave.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Applied:</span>{" "}
              {leave.createdAt.substring(0, 10)}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {duration} Days
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Applied to:</span>{" "}
            {leave.RequestedTo.name}
          </div>
        </div>
      </div>
    </div>
  );
}
