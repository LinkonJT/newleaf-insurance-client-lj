import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
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
import ClientReviewModal from "../../ClientReviewModal";
import AppSpinner from "../../../component/AppSpinner";
import FeedbackModal from "./FeedbackModal";




const MyPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
const [showModal, setShowModal] = useState(false);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  
const handleViewDetails = (app) => {
  setSelectedApp(app);
  setShowModal(true);
};

  if (isLoading) return <AppSpinner />;

  return (
    <div className="overflow-x-auto">
      <h1 className="font-bold text-black text-center text-2xl my-2">My Policies</h1>
      <Table striped>
        <TableHead>
          <TableRow>

            <TableHeadCell>Policy Title</TableHeadCell>
          <TableHeadCell>Coverage</TableHeadCell>
          <TableHeadCell>Term</TableHeadCell>
          <TableHeadCell>Premium</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell className="font-medium">
                {app.policyData?.title || "N/A"}
              </TableCell>
              {/* <TableCell>{app.policyData?.coverageRange || "N/A"}</TableCell> */}
              <TableCell>BDT {app.coverageAmount || "N/A"}</TableCell>
            <TableCell>{app.termLength || "N/A"} years</TableCell>
              <TableCell>৳{app.premiumAmount || "N/A"}/month</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-medium ${
                    app.status === "Pending"
                      ? "bg-amber-500"
                      : app.status === "Approved"
                      ? "bg-green-500"
                      : app.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}>
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="flex">
            <Button
  className="mr-2 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={() => handleViewDetails(app)}
>
  View Details
</Button>

                <div className="mr-2">
                  <ClientReviewModal policyId={app.policyId} policyTitle={app.policy?.title}></ClientReviewModal>
                </div>




                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FeedbackModal
  open={showModal}
  onClose={() => setShowModal(false)}
  application={selectedApp}
/>

    </div>
  );
};

export default MyPolicies;
