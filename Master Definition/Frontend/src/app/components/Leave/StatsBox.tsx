

import { LucideProps } from "lucide-react";

interface IconProps {
  icon: React.FC<LucideProps>;
  leave: number;
  title: string;
}

const StatsBox = ({ icon: Icon, leave, title }: IconProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-3">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {leave || 0}
          </div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;