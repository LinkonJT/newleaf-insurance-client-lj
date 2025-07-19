import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClaimRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch approved applications (policies)
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['approvedPolicies', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/approved/${user.email}`);
      return res.data;
    }
  });

  // Fetch existing claims by user
  const { data: claims = [] } = useQuery({
    queryKey: ['myClaims', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/claims/${user.email}`);
      return res.data;
    }
  });

  // Check if a claim already exists for a policy
  const getClaimStatus = (policyId) => {
    const claim = claims.find((c) => c.policyId === policyId);
    return claim?.status;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClaimSubmit = async (e, application) => {
    e.preventDefault();
    setUploading(true);

    const form = e.target;
    const reason = form.reason.value;

    try {
      // 1. Upload image to imgbb
      const formData = new FormData();
      formData.append("image", selectedFile);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const imgRes = await axiosSecure.post(imageUploadUrl, formData);
      const imageUrl = imgRes.data.data.url;

      // 2. Post claim to DB
      const claimData = {
        userEmail: user.email,
        policyId: application.policyId,
        policyTitle: application.policyTitle,
        reason,
        imageUrl,
      };

      await axiosSecure.post("/claims", claimData);
      Swal.fire("Claim Submitted!", "Your claim is under review.", "success");
      form.reset();
      setSelectedFile(null);
      queryClient.invalidateQueries(["myClaims"]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit claim", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Claim Request</h2>

      {isLoading ? (
        <p>Loading approved policies...</p>
      ) : applications.length === 0 ? (
        <p>No approved policies available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app) => {
            const claimStatus = getClaimStatus(app.policyId);
            const claimed = !!claimStatus;

            return (
              <div key={app._id} className="border p-4 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-2">{app.policyTitle}</h3>
                <p className="mb-2">
                  <span className="font-medium">Policy ID:</span> {app.policyId}
                </p>

                <form onSubmit={(e) => handleClaimSubmit(e, app)}>
                  <label className="block mb-1 font-medium">Reason for Claim</label>
                  <textarea
                    name="reason"
                    required
                    disabled={claimed}
                    className="w-full border rounded p-2 mb-2"
                  ></textarea>

                  <label className="block mb-1 font-medium">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={claimed}
                    required={!claimed}
                    className="mb-3"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={claimed || uploading}
                      className={`px-4 py-2 rounded bg-blue-600 text-white ${
                        claimed || uploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploading ? "Submitting..." : "Submit Claim"}
                    </button>

                    {claimed && (
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          claimStatus === "Approved"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {claimStatus}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClaimRequest;
