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
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

 const { mutateAsync } = useMutation({
  mutationFn: async ({ endpoint }) => {
    const res = await axiosSecure.patch(endpoint);
    return res.data;
  },
  onSuccess: () => {
    toast.success('Role updated successfully!');
    refetch();
  },
});

const handleRoleChange = (id, newRole) => {
  let endpoint = '';

  if (newRole === 'agent') {
    endpoint = `/users/${id}/promote-agent`;
  } else if (newRole === 'customer') {
    endpoint = `/users/${id}/demote-customer`;
  } else {
    console.error('Unsupported role:', newRole);
    return;
  }

  mutateAsync({ endpoint });
};

  if (isLoading) return <AppSpinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <Table striped>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Registered On</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
  <div className="flex gap-2">
    {user.role === "customer" && (
      <Button
        size="xs"
        color="success"
        className="bg-green-400 text-white"
        onClick={() => handleRoleChange(user._id, "agent")}
      >
        Promote to Agent
      </Button>
    )}
    {user.role === "agent" && (
      <Button
        size="xs"
        color="failure"
        className="bg-amber-200"
        onClick={() => handleRoleChange(user._id, "customer")}
      >
        Demote to Customer
      </Button>
    )}
  </div>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
