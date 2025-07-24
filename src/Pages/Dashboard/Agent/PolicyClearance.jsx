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
import ClaimDetailsModal from "../Shared/ClaimDetailsModal";

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch claims with status "Pending" (or you can fetch all claims as needed)
  const { data: claims = [], isLoading, error } = useQuery({
    queryKey: ["claims", "Pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/claims", {
        params: { status: "Pending" }, // adjust filter if needed
      });
      return res.data;
    },
  });

  // Mutation to update claim status (e.g., clear or reject claim)
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/claims/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Claim ${variables.status} successfully`);
      queryClient.invalidateQueries(["claims", "Pending"]);
    },
    onError: () => {
      toast.error("Failed to update claim status");
    },
  });

  const handleView = (claim) => {
    setSelectedClaim(claim);
    setModalOpen(true);
  };

  if (isLoading) return <AppSpinner />;
  if (error)
    return <p className="text-red-600">Error loading claims</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Policy Clearance</h2>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Policy</TableHeadCell>
              <TableHeadCell>Coverage</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No claims pending clearance.
                </TableCell>
              </TableRow>
            ) : (
              claims.map((claim) => (
                <TableRow key={claim._id}>
                  <TableCell>{claim.userName}</TableCell>
                  <TableCell>{claim.policyTitle || "N/A"}</TableCell>
                  <TableCell>৳{claim.coverageAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm text-white ${
                        claim.status === "Pending"
                          ? "bg-yellow-500"
                          : claim.status === "Cleared"
                          ? "bg-green-600"
                          : claim.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {claim.status === "Pending" && (
                      <>
                        
                        <Button
                          color="failure"
                          size="xs"
                          onClick={() =>
                            mutation.mutate({ id: claim._id, status: "Rejected" })
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="xs"
                      color="gray"
                      onClick={() => handleView(claim)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

  {modalOpen && selectedClaim && (
  <ClaimDetailsModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    claim={selectedClaim}
  />
      )}
    </div>
  );
};

export default PolicyClearance;
