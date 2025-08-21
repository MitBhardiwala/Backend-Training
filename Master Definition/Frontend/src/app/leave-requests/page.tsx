"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLeaveRequests } from "../lib/services/user/user";
import { toast } from "react-toastify";
import { LeaveRequestType, leaveStatus } from "../lib/definitions";
import LeaveRequestCard from "../components/Leave/LeaveRequestCard";
import { Button } from "@mui/material";
import { updateLeaveStatus } from "../lib/services/hod/hod";

export default function LeaveRequest() {
  const { data: session, status } = useSession();
  const [leaveRequests, setLeaveRequests] = useState([]);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
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
      toast.success(result.message || "Leave status updated");
    } else {
      toast.error(result.error || "Error in upadting leave status");
    }
  };

  return (
    <>
      <div>
        <div>Leave Request Page</div>

        <Button onClick={() => setCurrStatus(null)}>
          View all Leave Request
        </Button>
        <Button onClick={() => setCurrStatus(leaveStatus.pending)}>
          Pending Leave Requests
        </Button>
        <Button onClick={() => setCurrStatus(leaveStatus.approved)}>
          Approved Leave Requests
        </Button>
        <Button onClick={() => setCurrStatus(leaveStatus.reject)}>
          Rejected Leave Requests
        </Button>
        {leaveRequests.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-4 bg-white p-6">
            {leaveRequests.map((request: LeaveRequestType) => (
              <LeaveRequestCard
                key={request.id}
                leaveRequest={request}
                handleLeaveStatusChange={handleLeaveStatusChange}
              />
            ))}
          </div>
        )}

        {leaveRequests.length === 0 && (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            No leave request found
          </div>
        )}
      </div>
    </>
  );
}
