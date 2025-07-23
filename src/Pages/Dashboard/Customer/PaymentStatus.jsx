import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useNavigate } from "react-router";
import AppSpinner from "../../../component/AppSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentStatus = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${user.email}`);
      return res.data.filter((app) => app.status === "Approved");
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <AppSpinner />;

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell>Policy Title</TableHeadCell>
          <TableHeadCell>Premium Amount</TableHeadCell>
          <TableHeadCell>Payment Frequency</TableHeadCell>
          <TableHeadCell>Due Date / Last Paid</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {applications.map((app) => {
            const isPaid = app.payment_status === "Paid";

            return (
              <TableRow key={app._id}>
                <TableCell className="font-medium">
                  {app.policyData?.title || "N/A"}
                </TableCell>
                <TableCell>
                  {/* {app.policyData?.premiumCalculationLogic || "N/A"} */}
                  ৳{app.premiumAmount || "N/A"}
                </TableCell>
                <TableCell>
                  {app.policyData?.paymentFrequency || "Monthly"}
                </TableCell>
                <TableCell>
                  {app.paidAt
                    ? new Date(app.paidAt).toLocaleDateString()
                    : "Due"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${
                      isPaid ? "bg-green-500" : "bg-red-500"
                    }`}>
                    {isPaid ? "Paid" : "Due"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="xs"
                    onClick={() => navigate(`/dashboard/payment/${app._id}`)}
                    disabled={isPaid}
                    className={`${
                      isPaid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-2 py-1 rounded`}>
                    Make Payment
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentStatus;
