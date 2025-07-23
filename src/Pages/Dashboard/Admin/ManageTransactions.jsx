import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppSpinner from "../../../component/AppSpinner";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) return <AppSpinner />;
  if (isError) return <div className="text-red-600">Error: {error.message}</div>;

  // Format date utility
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Transactions</h2>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Transaction ID</TableHeadCell>
              <TableHeadCell>Customer Email</TableHeadCell>
              <TableHeadCell>Policy Name</TableHeadCell>
              <TableHeadCell>Paid Amount (BDT)</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.transactionId}>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.policyName}</TableCell>
                  <TableCell>${(payment.amount / 100).toFixed(2)}</TableCell>
                  <TableCell>{formatDate(payment.paidAt)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payment.status === "Success" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageTransactions;
