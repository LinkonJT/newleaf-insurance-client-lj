
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
import BlogModal from "./BlogModal";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BlogEditModal from "./BlogEditModal";

const ManageBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { role } = useUserRole();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", user?.email, role],
    queryFn: async () => {
      const res = await axiosSecure.get(
        role === "admin" || role === "agent"
          ? "/blogs"
          : `/blogs?authorEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!role,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Deleted!", "Blog deleted successfully.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to delete blog.", "error"),
  });

  if (isLoading) return <AppSpinner />;
  if (isError) return <div>Error loading blogs.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold my-4 text-black">Manage Blogs</h2>
        {(role === "admin" || role === "agent" || role === "customer") && (
          <BlogModal
            mode="add"
            onSuccess={() => queryClient.invalidateQueries(["blogs"])}
            buttonText="+ Add Blog"
            authorEmail={user.email}
            authorName={user.displayName}
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Author</TableHeadCell>
              <TableHeadCell>Publish Date</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{new Date(blog.publishedAt).toLocaleDateString()}</TableCell>
             <TableCell className="flex gap-2">
  {(role === "admin" || role === "agent" || blog.authorEmail === user.email) && (
    <BlogEditModal
      mode="edit"
      existingData={blog}
      onSuccess={() => queryClient.invalidateQueries(["blogs"])}
      buttonText="Edit"
      authorEmail={user.email}
      authorName={user.displayName}
    />
  )}
  {(role === "admin" || role === "agent" || blog.authorEmail === user.email) && (
    <Button
      size="xs"
      color="failure"
      onClick={() =>
        Swal.fire({
          title: "Delete this blog?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete!",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) deleteMutation.mutate(blog._id);
        })
      }
    >
      Delete
    </Button>
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageBlogs;
