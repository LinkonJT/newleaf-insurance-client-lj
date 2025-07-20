import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const ClaimRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications/approved/${user.email}`)
        .then((res) => {
          setApprovedApplications(res.data || []);
        })
        .catch(() => {
          toast.error("Failed to load approved applications.");
        });
    }
  }, [user?.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppId) {
      toast.warning("Please select a policy.");
      return;
    }

    const selectedApplication = approvedApplications.find(
      (app) => app._id === selectedAppId
    );

    const claimData = {
      applicationId: selectedApplication._id,
      userEmail: user.email,
      policyId: selectedApplication.policyId,
      policyTitle: selectedApplication.policyTitle,
      details,
    };

    try {
      const res = await axiosSecure.post("/claims", claimData);
      if (res.data.insertedId) {
        toast.success("Claim submitted successfully.");
        setSelectedAppId("");
        setDetails("");
      }
    } catch (error) {
      toast.error("Failed to submit claim.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Submit a Claim</h2>

      {approvedApplications.length === 0 ? (
        <p className="text-gray-500">No approved policies available.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Policy</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              required
            >
              <option value="">-- Select an approved policy --</option>
              {approvedApplications.map((app) => (
                <option key={app._id} value={app._id}>
                  {app.policyTitle || "Untitled Policy"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Claim Details</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your claim..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Claim
          </button>
        </form>
      )}
    </div>
  );
};

export default ClaimRequest;
