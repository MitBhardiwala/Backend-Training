import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { LeaveRecordType } from "@/app/lib/definitions";
import { getDaysDifference } from "@/app/lib/utils";

const LeaveHistory = ({
  leaveHistory,
}: {
  leaveHistory: LeaveRecordType[];
}) => {
  if (!leaveHistory.length) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        No leave history found
      </Box>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return { backgroundColor: '#dcfce7', color: '#15803d' };
      case 'pending':
        return { backgroundColor: '#fef3c7', color: '#d97706' };
      default:
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leave history table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applied</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Applied To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveHistory.map((leave: LeaveRecordType, index: number) => (
            <TableRow key={leave.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <span style={getStatusStyle(leave.status)}>
                  {leave.status}
                </span>
              </TableCell>
              <TableCell>{leave.createdAt.substring(0, 10)}</TableCell>
              <TableCell>
                {getDaysDifference(leave.startDate, leave.endDate)} Days
              </TableCell>
              <TableCell>{leave.RequestedTo.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveHistory;