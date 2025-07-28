import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppSpinner from "../../../component/AppSpinner";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { GrView } from "react-icons/gr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import RejectModal from "./RejectModal";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedAgent, setSelectedAgent] = useState({});

  const [showRejectModal, setShowRejectModal] = useState(false);
const [selectedAppId, setSelectedAppId] = useState(null);

  // Fetch all applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Fetch all agents for dropdown
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/agents");
      return res.data;
    },
  });

  // Mutation to assign agent
  const assignAgentMutation = useMutation({
    mutationFn: async ({ id, agentId }) => {
      return await axiosSecure.patch(`/applications/${id}/assign-agent`, {
        agentId,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Agent assigned successfully", "success");
      queryClient.invalidateQueries(["allApplications"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign agent", "error");
    },
  });

  // Mutation to reject application
// const rejectApplicationMutation = useMutation({
//   mutationFn: async ({ id, feedback }) => {
//     return await axiosSecure.patch(`/applications/${id}/reject`, { feedback });
//   },
//   onSuccess: () => {
//     Swal.fire("Rejected", "Application rejected with feedback", "warning");
//     queryClient.invalidateQueries(["allApplications"]);
//   },
//   onError: () => {
//     Swal.fire("Error", "Failed to reject application", "error");
//   },
// });

const rejectApplicationMutation = useMutation({
  mutationFn: async ({ id, feedback }) => {
    return await axiosSecure.patch(`/applications/${id}/reject`, { feedback });
  },
  onSuccess: () => {
    Swal.fire("Rejected", "Application rejected with feedback", "warning");
    queryClient.invalidateQueries(["allApplications"]);
  },
  onError: () => {
    Swal.fire("Error", "Failed to reject application", "error");
  },
});


  const handleAssignAgent = (id) => {
    const agentId = selectedAgent[id];
    if (!agentId) {
      return Swal.fire("Error", "Please select an agent first", "warning");
    }

    Swal.fire({
      title: "Assign this agent?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
    }).then((result) => {
      if (result.isConfirmed) {
        assignAgentMutation.mutate({ id, agentId });
      }
    });
  };

  // const handleReject = (id) => {
  //   Swal.fire({
  //     title: "Reject this application?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, reject",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       rejectApplicationMutation.mutate({ id });
  //     }
  //   });
  // };

const handleReject = (id) => {
  Swal.fire({
    title: "Reject this application?",
    text: "Are you sure you want to reject it?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, reject",
  }).then((result) => {
    if (result.isConfirmed) {
      setSelectedAppId(id);
      setShowRejectModal(true);
    }
  });
};

const handleSubmitFeedback = (feedback) => {
  if (!selectedAppId || !feedback) return;
  rejectApplicationMutation.mutate({ id: selectedAppId, feedback });
  setShowRejectModal(false);
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
          <TableHeadCell>Application Date</TableHeadCell>
          <TableHeadCell>Term</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Assign Agent</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.policyTitle || app.policyData?.title}</TableCell>
              <TableCell>৳{app.coverageAmount}</TableCell>
              <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{app.termLength} years</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-medium ${
                    app.status === "Pending"
                      ? "bg-amber-500"
                      : app.status === "Assigned"
                      ? "bg-blue-600"
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
              <TableCell>
                {app.status === "Pending" && (
                  <select
                    className="border px-1 py-0.5 text-sm rounded"
                    value={selectedAgent[app._id] || ""}
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        [app._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                )}
              </TableCell>
              <TableCell className="flex gap-2 flex-wrap">
                {app.status === "Pending" && (
                  <>
                    <div className="flex justify-center gap-1">
                      <Button
                      size="xs"
                      color="success"
                      onClick={() => handleAssignAgent(app._id)}
                      isProcessing={assignAgentMutation.isPending}
                      className="bg-green-600 text-white hover:bg-green-400"
                    >
                    <MdAssignmentTurnedIn size={25}></MdAssignmentTurnedIn>
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => handleReject(app._id)}
                      isProcessing={rejectApplicationMutation.isPending}
                      className="bg-red-700 text-white hover:bg-red-600"
                    >
                      Reject
                    </Button>
                    </div>
                  </>
                )}
           
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

       {/* Feedback Modal */}
      <RejectModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default ManageApplications;
