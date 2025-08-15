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
    <div>
      <Icon className="h-10 w-10" />

      <p>Reason :{leave.reason}</p>
      <p>Applied at:{leave.createdAt.substring(0, 10)}</p>
      <p>Duration :{duration} Days</p>
      <p>Status: {leave.status}</p>
      <p>Applied to : {leave.RequestedTo.name}</p>
    </div>
  );
}
