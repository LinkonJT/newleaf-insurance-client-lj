import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ClaimRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Get all approved policies of the user
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApprovedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data.filter(app => app.status === "Approved");
    },
  });

  const handleClaimSubmit = async (e, app) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const reason = form.reason.value;
    const file = form.document.files[0];

    // Step 1: Upload image to IMGBB
    const formData = new FormData();
    formData.append("image", file);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    let documentURL = "";

    try {
      const res = await axiosSecure.post(imageUploadUrl, formData);
      documentURL = res.data.data.url;
    } catch (error) {
      console.error("IMGBB Upload Error:", error);
      Swal.fire("Upload Failed", "Unable to upload document. Try again.", "error");
      setSubmitting(false);
      return;
    }

    // Step 2: Submit claim to DB
    const claimData = {
      userEmail: user.email,
      userName: user.displayName,
      policyTitle: app.policyTitle,
      applicationId: app._id,
      reason,
      documentURL,
      claimStatus: "Pending",
    };

    try {
      const response = await axiosSecure.post("/claims", claimData);
      if (response.data.insertedId) {
        Swal.fire("Success", "Your claim has been submitted!", "success");
        form.reset();
        setSelectedApplication(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit claim", "error");
    }

    setSubmitting(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Claim Request</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {applications.length === 0 && <p>No approved policies found.</p>}

          {applications.map((app) => (
            <div key={app._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{app.policyTitle}</h3>
              <p><span className="font-medium">Status:</span> {app.claimStatus || "Not Claimed"}</p>

              {app.claimStatus === "Pending" || app.claimStatus === "Approved" ? (
                <p className={`mt-2 font-semibold text-${app.claimStatus === "Approved" ? "green" : "yellow"}-600`}>
                  Claim Status: {app.claimStatus}
                </p>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedApplication(app)}
                    className="btn btn-primary mt-3"
                  >
                    Submit Claim
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Claim form */}
      {selectedApplication && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Submit Claim for: {selectedApplication.policyTitle}</h3>
          <form onSubmit={(e) => handleClaimSubmit(e, selectedApplication)} className="space-y-4 max-w-md">
            <div>
              <label className="label">
                <span className="label-text">Policy Title</span>
              </label>
              <input
                type="text"
                value={selectedApplication.policyTitle}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Reason for Claim</span>
              </label>
              <textarea
                name="reason"
                required
                className="textarea textarea-bordered w-full"
                placeholder="Describe the reason"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Upload Document (image only)</span>
              </label>
              <input
                type="file"
                name="document"
                accept=".jpg,.jpeg,.png"
                required
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn btn-success"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Claim"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedApplication(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClaimRequest;
