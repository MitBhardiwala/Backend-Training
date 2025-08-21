"use client";

import { LeaveRequestType } from "@/app/lib/definitions";
import { getDaysDifference } from "@/app/lib/utils";
import { useState } from "react";

export default function LeaveRequestCard({
  leaveRequest,
  handleLeaveStatusChange,
}: {
  leaveRequest: LeaveRequestType;
  handleLeaveStatusChange: (
    newStatus: string,
    leaveId: number,
    requestedUserId: number
  ) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const handleApprove = () => {
    handleLeaveStatusChange("approved", leaveRequest.id, leaveRequest.RequestedBy.id);
    setShowMenu(false);
  };

  const handleReject = () => {
    handleLeaveStatusChange("rejected", leaveRequest.id, leaveRequest.RequestedBy.id);
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Employee Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-semibold">
                {leaveRequest.RequestedBy.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">
                {leaveRequest.RequestedBy.name}
              </h3>
              <p>{leaveRequest.RequestedBy.email}</p>
            </div>
          </div>
        </div>

        {/* Leave Details */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>Start Date</p>
              <p className="font-medium">
                {new Date(leaveRequest.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>End Date</p>
              <p className="font-medium">
                {new Date(leaveRequest.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>Duration</p>
              <p className="font-medium">
                {getDaysDifference(leaveRequest.startDate, leaveRequest.endDate)} days
              </p>
            </div>
            <div>
              <p>Leave Type</p>
              <p className="font-medium">{leaveRequest.leaveType}</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Reason</p>
            <p className="mt-1">{leaveRequest.reason}</p>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex-shrink-0 flex flex-col items-end gap-4">
          <div className="relative">
            <span
              className={`px-3 py-1 rounded-full font-medium border capitalize ${getStatusStyle(
                leaveRequest.status
              )}`}
            >
              {leaveRequest.status}
            </span>
          </div>

          {leaveRequest.status === "pending" && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Change Status
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-32">
                    <button
                      onClick={handleApprove}
                      className="w-full text-left px-4 py-2 text-green-700 rounded-t-lg"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="w-full text-left px-4 py-2 text-red-700 rounded-b-lg border-t border-gray-100"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}