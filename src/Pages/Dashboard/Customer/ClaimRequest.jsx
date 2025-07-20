import { Label, Button, Select, FileInput, HelperText, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ClaimRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // --- Queries ---
  const { data: applications = [] } = useQuery({
    queryKey: ["approved-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: existingClaims = {} } = useQuery({
    queryKey: ["existing-claims", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claims/${user?.email}`);
      const map = {};
      res.data.forEach(claim => {
        map[claim.applicationId] = claim.status;
      });
      return map;
    },
    enabled: !!user?.email,
  });

  // --- Image Upload handler ---
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imageUploadUrl, formData);
    const imageUrl = res.data?.data?.url;

    if (imageUrl) {
      setValue("claimFileUrl", imageUrl);
      Swal.fire("Image Uploaded", "Your image has been uploaded", "success");
    }
  };

  // --- Mutation for claim ---
  const claimMutation = useMutation({
    mutationFn: async (data) => {
      return axiosSecure.post("/claims", data);
    },
    onSuccess: () => {
      Swal.fire("Success", "Claim submitted successfully!", "success");
      queryClient.invalidateQueries(["existing-claims", user?.email]);
      reset(); // Clear form
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit claim", "error");
    },
  });

  const onSubmit = (data) => {
    const payload = {
      applicationId: data.applicationId,
      userEmail: user.email,
      claimReason: data.claimReason,
      claimFileUrl: data.claimFileUrl,
      status: "Pending",
      createdAt: new Date(),
    };
    claimMutation.mutate(payload);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-400 shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Submit a Claim</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Approved Policy Selection */}
        <div>
          <Label htmlFor="applicationId" value="Select Approved Policy" />
          <Select
            id="applicationId"
            {...register("applicationId", { required: "Please select a policy" })}
          >
            <option value="">Select a policy</option>
            {applications.map((app) => (
              <option key={app._id} value={app._id}>
                {app.policyTitle || "Untitled Policy"}
              </option>
            ))}
          </Select>
          {errors.applicationId && (
            <p className="text-red-500 text-sm">{errors.applicationId.message}</p>
          )}
        </div>

        {/* Show Claim Status */}
        {watch("applicationId") && (
          <p className="text-sm text-gray-500">
            Claim Status:{" "}
            <span className="font-medium">
              {existingClaims?.[watch("applicationId")] || "Not claimed yet"}
            </span>
          </p>
        )}

        {/* Reason for Claim */}
        <div>
          <Label htmlFor="claimReason">Reason For Claim</Label>
          <TextInput
            id="claimReason"
            placeholder="Enter reason for claim"
            {...register("claimReason", { required: "Claim reason is required" })}
          />
          {errors.claimReason && (
            <p className="text-red-500 text-sm">{errors.claimReason.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <Label className="mb-2 block" htmlFor="photo">Upload Supporting Photo</Label>
          <FileInput id="photo" onChange={handleImageUpload} />
          <HelperText className="mt-1 text-xs md:text-sm">
            PNG, JPG, or GIF (MAX. 800x400px).
          </HelperText>
          {errors.claimFileUrl && (
            <p className="text-red-500 text-sm mt-1">Photo is required</p>
          )}
        </div>

        {/* Hidden Field for Uploaded Image URL */}
        <input type="hidden" {...register("claimFileUrl", { required: true })} />

        <Button
          type="submit"
          disabled={
            !watch("applicationId") ||
            !!existingClaims?.[watch("applicationId")] ||
            !watch("claimFileUrl")
          }
        >
          Submit Claim
        </Button>
      </form>
    </div>
  );
};

export default ClaimRequest;
