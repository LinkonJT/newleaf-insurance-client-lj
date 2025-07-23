import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppSpinner from "../../../component/AppSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import { toast } from "react-toastify";
import { GrView } from "react-icons/gr";
import AssignedCustomerModal from "./AssignedCustomerModal";
import useAuth from "../../../hooks/useAuth";

const AssignedCustomers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: agentInfo, isLoading: loadingAgent } = useQuery({
    queryKey: ["agentInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    data: assignedApps = [],
    isLoading: loadingApps,
    isError,
    error,
  } = useQuery({
    queryKey: ["assignedApplications", agentInfo?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/assigned/${agentInfo._id}`);
      return res.data;
    },
    enabled: !!agentInfo?._id,
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/applications/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success(`Application marked as ${variables.status}`);
      queryClient.invalidateQueries(["assignedApplications", agentInfo?._id]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const handleView = (app) => {
    setSelectedCustomer(app);
    setModalOpen(true);
  };

  if (loadingAgent || loadingApps) return <AppSpinner />;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assigned Customers</h2>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Policy</TableHeadCell>
              <TableHeadCell>Premium</TableHeadCell>
              <TableHeadCell>Coverage</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No assigned applications found.
                </TableCell>
              </TableRow>
            ) : (
              assignedApps.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.policyTitle || "N/A"}</TableCell>
                  <TableCell>৳{app.premiumAmount}</TableCell>
                  <TableCell>৳{app.coverageAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        app.status === "Approved"
                          ? "bg-green-500"
                          : app.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      color="success"
                      className="bg-green-500 text-white"
                      size="xs"
                      disabled={app.status !== "Assigned"}
                      onClick={() =>
                        mutation.mutate({ id: app._id, status: "Approved" })
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-500 text-white"
                      color="failure"
                      size="xs"
                      disabled={app.status !== "Assigned"}
                      onClick={() =>
                        mutation.mutate({ id: app._id, status: "Rejected" })
                      }
                    >
                      Reject
                    </Button>
                    <Button size="xs" color="gray" onClick={() => handleView(app)}>
                     Details 
                     <AssignedCustomerModal></AssignedCustomerModal>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔽 Modal should be outside the table */}
        {modalOpen && selectedCustomer && (
      <AssignedCustomerModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        customer={selectedCustomer}
      />
    )}
    </div>
  );
};

export default AssignedCustomers;
