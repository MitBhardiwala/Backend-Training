import { LucideProps } from "lucide-react";

interface IconProps {
  icon: React.FC<LucideProps>;
  leave: number;
  title: string;
}
const LeaveBox = ({ icon: Icon, leave, title }: IconProps) => {
  return (
    <div>
      <div className="flex items-center border-1 gap-2 bg-green-200">
        <Icon className="h-10 w-10" />

        <div className="flex flex-col">
          <div className="font-bold">{leave}</div>
          <div>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBox;
