"use client"

import { LucideProps } from "lucide-react";

interface IconProps {
  icon: React.FC<LucideProps>;
  leave: number;
  title: string;
}

const StatsBox = ({ icon: Icon, leave, title }: IconProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 ">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-50 rounded-full p-2">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <div className="flex-1">
          <div className="text-2xl font-semibold text-gray-900">
            {leave || 0}
          </div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;
