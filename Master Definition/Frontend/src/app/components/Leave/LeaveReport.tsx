interface LeaveDetail {
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  department: string;
  RequestedLeaves: LeaveDetail[];
}

interface UserWithMaxLeave {
  usedLeave: number;
  user: {
    name: string;
    email: string;
    department: string;
    phone: string;
  };
}

interface LeaveReportData {
  leaveDetails: User[];
  userwithMaxLeave: UserWithMaxLeave[];
}

interface LeaveReportProps {
  data: LeaveReportData;
}

export default function LeaveReport({ data }: LeaveReportProps) {
  const { leaveDetails, userwithMaxLeave } = data;

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Leave Report</h2>

      {/* User with Maximum Leaves */}
      {userwithMaxLeave.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            User with Maximum Leaves
          </h3>
          <div className="border rounded-lg p-4">
            <p>
              <strong>Name:</strong> {userwithMaxLeave[0].user.name}
            </p>
            <p>
              <strong>Email:</strong> {userwithMaxLeave[0].user.email}
            </p>
            <p>
              <strong>Department:</strong> {userwithMaxLeave[0].user.department}
            </p>
            <p>
              <strong>Phone:</strong> {userwithMaxLeave[0].user.phone}
            </p>
            <p>
              <strong>Total Leaves Used:</strong>{" "}
              {userwithMaxLeave[0].usedLeave}
            </p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Other Users
        </h3>
        <div className="space-y-2">
          {leaveDetails
            .filter(
              (user) =>
                !userwithMaxLeave.some(
                  (maxUser) => maxUser.user.email === user.email
                )
            )
            .map((user, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-md font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.department}</p>
                </div>
                <div className="text-sm">
                  <strong>Leaves Used: {user.RequestedLeaves.length}</strong>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
