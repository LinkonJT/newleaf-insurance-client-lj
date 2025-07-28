// src/pages/Dashboard/Admin/RejectModal.jsx
import { Modal, Button, Label, Textarea, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { useState } from "react";

const RejectModal = ({ open, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    onSubmit(feedback);
    setFeedback(""); // clear after submit
  };

  return (
    <Modal show={open} onClose={onClose}>
      <ModalHeader>Rejection Feedback</ModalHeader>
      <ModalBody>
        <Label htmlFor="feedback" value="Provide feedback for the applicant" />
        <Textarea
          id="feedback"
          rows={4}
          placeholder="Enter rejection reason..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button color="failure" className="bg-blue-500 hover:bg-blue-700" onClick={handleSubmit}>
          Submit Rejection
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RejectModal;
