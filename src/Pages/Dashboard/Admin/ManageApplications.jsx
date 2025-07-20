import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
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

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const assignAgentMutation = useMutation({
    mutationFn: async ({ id }) => {
      return await axiosSecure.patch(`/applications/${id}/assign-agent`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Agent assigned successfully", "success");
      queryClient.invalidateQueries(["allApplications"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign agent", "error");
    },
  });

  const rejectApplicationMutation = useMutation({
    mutationFn: async ({ id }) => {
      return await axiosSecure.patch(`/applications/${id}/reject`);
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Application rejected", "warning");
      queryClient.invalidateQueries(["allApplications"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject application", "error");
    },
  });

  const handleAssignAgent = (id) => {
    Swal.fire({
      title: "Assign Agent?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
    }).then((result) => {
      if (result.isConfirmed) {
        assignAgentMutation.mutate({ id });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectApplicationMutation.mutate({ id });
      }
    });
  };

  if (isLoading) return <AppSpinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Applications</h2>
      <Table striped>
        <TableHead>
          <TableHeadCell>Applicant</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Policy</TableHeadCell>
          <TableHeadCell>Coverage</TableHeadCell>
          <TableHeadCell>Term</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.policyTitle || app.policyData?.title}</TableCell>
              <TableCell>৳{app.coverageAmount}</TableCell>
              <TableCell>{app.termLength} years</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-medium ${
                    app.status === "Pending"
                      ? "bg-amber-500"
                      : app.status === "Approved"
                      ? "bg-green-600"
                      : app.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2">
                {app.status === "Pending" && (
                  <>
                    <Button
                      size="xs"
                      color="success"
                      onClick={() => handleAssignAgent(app._id)}
                    >
                      Assign Agent
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => handleReject(app._id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button size="xs" color="gray">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageApplications;
