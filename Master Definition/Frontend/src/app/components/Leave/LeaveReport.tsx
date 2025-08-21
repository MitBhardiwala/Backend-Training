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
          <h3 className="text-lg font-semibold text-gray-700 mb-2">User with Maximum Leaves</h3>
          <div className="border rounded-lg p-4">
            <p><strong>Name:</strong> {userwithMaxLeave[0].user.name}</p>
            <p><strong>Email:</strong> {userwithMaxLeave[0].user.email}</p>
            <p><strong>Department:</strong> {userwithMaxLeave[0].user.department}</p>
            <p><strong>Phone:</strong> {userwithMaxLeave[0].user.phone}</p>
            <p><strong>Total Leaves Used:</strong> {userwithMaxLeave[0].usedLeave}</p>
          </div>
        </div>
      )}

      {/* All Users Leave Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">All Users Leave Details</h3>
        <div className="space-y-4">
          {leaveDetails.map((user, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="mb-3">
                <h4 className="text-md font-semibold">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.department}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              
              {user.RequestedLeaves.length > 0 ? (
                <div>
                  <h5 className="text-sm font-medium mb-2">Leave Requests:</h5>
                  <div className="space-y-2">
                    {user.RequestedLeaves.map((leave, leaveIndex) => (
                      <div key={leaveIndex} className="bg-gray-50 p-3 rounded">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
                          <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
                          <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                          <p><strong>Status:</strong> {leave.status}</p>
                        </div>
                        <p className="text-sm mt-2"><strong>Reason:</strong> {leave.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No leave requests</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}