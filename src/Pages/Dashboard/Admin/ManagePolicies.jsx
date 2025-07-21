import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppSpinner from "../../../component/AppSpinner";
import Swal from "sweetalert2";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Modal, Label, TextInput, Textarea, FileInput, HelperText } from "flowbite-react";
import PolicyModal from "./PolicyModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies"],
    queryFn: () => axiosSecure.get("/policies").then(res => res.data.policies || res.data)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/policies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["policies"]);
      Swal.fire("Deleted!", "Policy deleted successfully.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to delete policy.", "error")
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editPolicy, setEditPolicy] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this policy?", icon: "warning",
      showCancelButton: true, confirmButtonText: "Yes, delete!"
    }).then(({ isConfirmed }) => {
      if (isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openModal = (policy = null) => {
    setEditPolicy(policy);
    setModalOpen(true);
  };

  if (isLoading) return <AppSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Policies</h2>
        <PolicyModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        policy={editPolicy}
        refresh={() => {
          queryClient.invalidateQueries(["policies"]);
          setModalOpen(false);
        }}
      ></PolicyModal>
      </div>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Base Premium</TableHeadCell>
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {policies.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.basePremiumRate}</TableCell>
                <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="xs" color="info" onClick={() => openModal(p)}>Edit</Button>
                  <Button size="xs" color="failure" onClick={() => handleDelete(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

     
    </div>
  );
};

export default ManagePolicies;
