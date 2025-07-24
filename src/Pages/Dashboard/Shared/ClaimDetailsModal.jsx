import { Modal } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ClaimDetailsModal = ({ isOpen, onClose, claim }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: approveClaim, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/claims/${claim._id}`, {
        status: "Approved",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Claim approved successfully");
      queryClient.invalidateQueries(["claims", "Pending"]);
      onClose(); // close modal after approval
    },
    onError: () => {
      toast.error("Failed to approve claim");
    },
  });

  if (!claim) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="p-4 bg-blue-100 rounded-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 bg-blue-700 p-2 text-gray-100 hover:text-black rounded"
        >
          X
        </button>

        <h3 className="text-xl font-semibold mb-2">Claim Details</h3>

        {claim.claimFileUrl && (
          <img
            src={claim.claimFileUrl}
            alt={`Claim file for ${claim.policyTitle}`}
            className="w-full rounded mb-4 max-h-60 object-contain"
          />
        )}

        <p><strong>User Name:</strong> {claim.userName}</p>
        <p><strong>User Email:</strong> {claim.userEmail}</p>
        <p><strong>Policy Title:</strong> {claim.policyTitle}</p>
        <p><strong>Coverage Amount:</strong> ৳{claim.coverageAmount}</p>
        <p><strong>Reason:</strong> {claim.reason}</p>
        <p><strong>Status:</strong> {claim.status}</p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(claim.createdAt).toLocaleString()}
        </p>

        {claim.status === "Pending" ? (
          <button
            onClick={approveClaim}
            disabled={isPending}
            className="mt-4 bg-green-600 px-4 py-2 rounded-sm text-white hover:bg-green-700"
          >
            {isPending ? "Approving..." : "Approve Claim"}
          </button>
        ) : (
          <p className="mt-4 text-green-700 font-semibold">
            ✅ Already Approved
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ClaimDetailsModal;
