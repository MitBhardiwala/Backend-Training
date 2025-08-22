"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLeaveRequests } from "../lib/services/user/user";
import { toast } from "react-toastify";
import { LeaveRequestType, leaveStatus } from "../lib/definitions";
import LeaveRequestCard from "../components/Leave/LeaveRequestCard";
import { updateLeaveStatus } from "../lib/services/hod/hod";

export default function LeaveRequest() {
  const { data: session, status } = useSession();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestType[]>([]);
  const [currStatus, setCurrStatus] = useState<leaveStatus | null>(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      if (session && session.user.role) {
        const result = await getLeaveRequests(
          session.accessToken,
          session.user.role,
          currStatus
        );

        if (result.success) {
          setLeaveRequests(result.data);
        } else {
          console.log("Error : ", result);
        }
      }
    };

    fetchLeaveRequests();
  }, [session, currStatus]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );

  if (session.user.role !== "Hod" && session.user.role !== "Faculty")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Unauthorized User</div>
      </div>
    );

  if (!session.user.department)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 px-6 py-4 rounded-lg border border-red-200 text-center max-w-md">
          No department has been assigned, please contact admin
        </div>
      </div>
    );

  const handleLeaveStatusChange = async (
    newStatus: string,
    leaveId: number,
    requestedUserId: number
  ) => {
    const result = await updateLeaveStatus(
      session.accessToken,
      newStatus,
      leaveId,
      requestedUserId,
      session.user.role
    );

    if (result.success) {
      const result2 = await getLeaveRequests(
        session.accessToken,
        session.user.role,
        currStatus
      );
      if (result2.success) {
        setLeaveRequests(result2.data);
      }
      toast.success(result.message || "Leave status updated");
    } else {
      toast.error(result.error || "Error in updating leave status");
    }
  };

  const getActiveButtonClass = (statusFilter: leaveStatus | null) => {
    return currStatus === statusFilter ? "bg-blue-600 text-white" : "bg-white";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-bold mb-2">Leave Requests</h1>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrStatus(null)}
              className={`px-4 py-2 rounded-lg border ${getActiveButtonClass(
                null
              )}`}
            >
              All Requests
            </button>
            <button
              onClick={() => setCurrStatus(leaveStatus.pending)}
              className={`px-4 py-2 rounded-lg border ${getActiveButtonClass(
                leaveStatus.pending
              )}`}
            >
              Pending
            </button>
            <button
              onClick={() => setCurrStatus(leaveStatus.approved)}
              className={`px-4 py-2 rounded-lg border ${getActiveButtonClass(
                leaveStatus.approved
              )}`}
            >
              Approved
            </button>
            <button
              onClick={() => setCurrStatus(leaveStatus.reject)}
              className={`px-4 py-2 rounded-lg border ${getActiveButtonClass(
                leaveStatus.reject
              )}`}
            >
              Rejected
            </button>
          </div>
        </div>

        {leaveRequests.length > 0 ? (
          <div className="space-y-4">
            {leaveRequests.map((request: LeaveRequestType) => (
              <LeaveRequestCard
                key={request.id}
                leaveRequest={request}
                handleLeaveStatusChange={handleLeaveStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border">
            <div>No leave requests found</div>
          </div>
        )}
      </div>
    </div>
  );
}
