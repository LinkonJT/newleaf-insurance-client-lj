import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppSpinner from "../../../component/AppSpinner";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import PolicyModal from "./PolicyModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 5; // number of policies per page

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["policies", page],
    queryFn: () =>
      axiosSecure
        .get(`/policies?page=${page}&limit=${limit}`)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/policies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["policies"]);
      Swal.fire("Deleted!", "Policy deleted successfully.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to delete policy.", "error"),
  });

  if (isLoading) return <AppSpinner />;
  if (isError) return <div>Error loading policies.</div>;

  const { policies, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Policies</h2>
        <PolicyModal
          mode="add"
          existingData={null}
          onSuccess={() => queryClient.invalidateQueries(["policies"])}
          buttonText="+ Add Policy"
        />
      </div>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Base Premium</TableHeadCell>
              <TableHeadCell>Created</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {policies.map((policy) => (
              <TableRow key={policy._id}>
                <TableCell>{policy.title}</TableCell>
                <TableCell>{policy.category}</TableCell>
                <TableCell>{policy.basePremiumRate}</TableCell>
                <TableCell>
                  {new Date(policy.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <PolicyModal
                    mode="edit"
                    existingData={policy}
                    onSuccess={() => queryClient.invalidateQueries(["policies"])}
                    buttonText="Edit"
                  />
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() =>
                      Swal.fire({
                        title: "Delete this policy?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete!",
                      }).then(({ isConfirmed }) => {
                        if (isConfirmed) deleteMutation.mutate(policy._id);
                      })
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </Button>
        <span className="px-3 py-1 text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ManagePolicies;
