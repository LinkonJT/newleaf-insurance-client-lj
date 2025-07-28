import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

const FeedbackModal = ({ open, onClose, application }) => {
  if (!application) return null;

  const {
    name,
    email,
    policyTitle,
    coverageAmount,
    premiumAmount,
    status,
    rejectionFeedback,
  } = application;

  return (
    <Modal show={open} onClose={onClose} >
      <ModalHeader>Application Details</ModalHeader>
      <ModalBody className="bg-gray-400">
        <div className="space-y-2 text-sm">
          <p><strong>Client Name:</strong> {name}</p>
          <p><strong>Client Email:</strong> {email}</p>
          <p><strong>Policy Title:</strong> {policyTitle}</p>
          <p><strong>Coverage:</strong> BDT {coverageAmount}</p>
          <p><strong>Premium:</strong> ৳{premiumAmount} / month</p>
          <p><strong>Status:</strong> {status}</p>

          {status === "Rejected" && (
            <p className="text-red-600"><strong>Feedback:</strong> {rejectionFeedback || "No feedback provided."}</p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default FeedbackModal;
