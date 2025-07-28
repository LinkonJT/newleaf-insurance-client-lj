import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useNavigate } from "react-router";
import AppSpinner from "../../../component/AppSpinner";

const PaymentStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${user.email}`);
      return res.data.filter(app => app.status === "Approved");
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <AppSpinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center my-4 text-black">Payment Status</h2>
      <Table striped>
        <TableHead>
          <TableRow>
<TableHeadCell>Policy Title</TableHeadCell>
          <TableHeadCell>Premium Amount</TableHeadCell>
          <TableHeadCell>Frequency</TableHeadCell>
          <TableHeadCell>Due Date / Last Paid</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>

          </TableRow>
          
        </TableHead>
        <TableBody className="divide-y">
          {applications.map(app => (
            <TableRow key={app._id}>
              <TableCell>{app.policyData?.title || "N/A"}</TableCell>
              <TableCell>৳{app.premiumAmount || "N/A"}</TableCell>
              <TableCell>{app.paymentFrequency || "Monthly"}</TableCell>
              <TableCell>
                {app.payment_status === "Paid"
                  ? new Date(app.paidAt).toLocaleDateString()
                  : "Due Now"}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    app.payment_status === "Paid"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {app.payment_status || "Due"}
                </span>
              </TableCell>
              <TableCell>
                {app.payment_status !== "Paid" && (
                  <Button
                    size="xs"
                    color="blue"
                    onClick={() => navigate(`/dashboard/payment/${app._id}`)}
                  >
                    Make Payment
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentStatus;
