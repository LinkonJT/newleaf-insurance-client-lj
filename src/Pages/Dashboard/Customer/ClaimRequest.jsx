import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  Label,
  Button,
  Select,
  FileInput,
  HelperText,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { useState } from "react";

const ClaimRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAppId, setSelectedAppId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch approved applications
  const { data: applications = [], isLoading: loadingApps } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch existing claims
  const { data: claims = [], isLoading: loadingClaims } = useQuery({
    queryKey: ["claims", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claims/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const claimsMap = {};
  claims.forEach(claim => {
    claimsMap[claim.applicationId] = claim.status;
  });

  // Image Upload Handler (IMGBB)
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imgbbUrl, formData);
    setImageUrl(res.data.data.url);
  };

  // Submit Claim
  const mutation = useMutation({
    mutationFn: async (claimData) => {
      const res = await axiosSecure.post("/claims", claimData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Claim submitted successfully!", "success");
      queryClient.invalidateQueries(["claims", user?.email]);
      reset();
      setSelectedAppId("");
      setImageUrl("");
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit claim", "error");
    },
  });

  const onSubmit = (data) => {
    if (!selectedAppId || !imageUrl) return;

    const payload = {
      applicationId: selectedAppId,
      userEmail: user.email,
      claimFileUrl: imageUrl,
      reason: data.claimReason,
      status: "Pending",
      createdAt: new Date(),
    };
    mutation.mutate(payload);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">Submit a Claim</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Select Approved Policy */}
        <div>
          <Label htmlFor="policy" value="Select Approved Policy" />
          <Select
            id="policy"
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            required
          >
            <option value="">Select a policy</option>
            {applications.map((app) => (
              <option key={app._id} value={app._id}>
                {app.policyTitle}
              </option>
            ))}
          </Select>
        </div>

        {/* Claim Status */}
        {selectedAppId && (
          <p className="text-sm text-gray-600">
            Claim Status:{" "}
            <span className="font-medium text-black">
              {claimsMap[selectedAppId] || "Not claimed yet"}
            </span>
          </p>
        )}

        {/* Reason Input */}
        <div>
          <Label htmlFor="claimReason" value="Reason for Claim" />
          <TextInput
            id="claimReason"
            placeholder="Enter reason for claim"
            {...register("claimReason", { required: "Reason is required" })}
          />
          {errors.claimReason && (
            <HelperText color="failure">
              {errors.claimReason.message}
            </HelperText>
          )}
        </div>

        {/* File Upload */}
        <div>
          <Label htmlFor="photo" value="Upload Document/Proof" />
          <FileInput id="photo" onChange={handleImageUpload} />
          <HelperText className="text-xs mt-1">
            JPG, PNG, or PDF proof (uploaded to IMGBB).
          </HelperText>
        </div>

        {/* Submit Button or Status */}
        {selectedAppId && claimsMap[selectedAppId] ? (
          <div className="text-center font-medium text-green-600">
            You have already submitted a claim. Status:{" "}
            {claimsMap[selectedAppId]}
          </div>
        ) : (
          <Button
            type="submit"
            disabled={!selectedAppId || !imageUrl || mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit Claim"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ClaimRequest;
