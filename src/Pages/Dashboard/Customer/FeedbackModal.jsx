import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { jsPDF } from "jspdf";

const FeedbackModal = ({ open, onClose, application }) => {
  if (!application) return null;

  const {
    name,
    email,
    policyTitle,
    coverageAmount,
    premiumAmount,
    status,
    dob,
    phone,
    nomineeName,
    relationship,
    termLength,
    rejectionFeedback,
  } = application;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Insurance Policy Details", 20, 20);

    const lines = [
      `Client Name: ${name}`,
      `Date of Birth: ${dob}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Policy Title: ${policyTitle}`,
      `Coverage Amount: BDT ${coverageAmount}`,
      `Term Length: ${termLength} years`,
      `Premium: ৳${premiumAmount} / month`,
      `Nominee: ${nomineeName}`,
      `Relationship: ${relationship}`,
      `Status: ${status}`,
    ];

    if (status === "Rejected" && rejectionFeedback) {
      lines.push(`Rejection Feedback: ${rejectionFeedback}`);
    }

    let y = 35;
    lines.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    doc.save(`Policy_${policyTitle.replace(/\s+/g, "_")}_${name}.pdf`);
  };

  return (
    <Modal show={open} onClose={onClose}>
      <ModalHeader>Application Details</ModalHeader>
      <ModalBody className="bg-gray-400">
        <div className="space-y-2 text-sm">
          <p><strong>Client Name:</strong> {name}</p>
          <p><strong>DOB:</strong> {dob}</p>
          <p><strong>Client Email:</strong> {email}</p>
          <p><strong>Client Phone:</strong> {phone}</p>
          <p><strong>Policy Title:</strong> {policyTitle}</p>
          <p><strong>Coverage:</strong> BDT {coverageAmount}</p>
          <p><strong>Term Length:</strong> {termLength} years</p>
          <p><strong>Premium:</strong> ৳{premiumAmount} / month</p>
          <p><strong>Nominee:</strong> {nomineeName}</p>
          <p><strong>Relationship with nominee:</strong> {relationship}</p>
          <p><strong>Status:</strong> {status}</p>

          {status === "Rejected" && (
            <p className="text-red-600">
              <strong>Feedback:</strong> {rejectionFeedback || "No feedback provided."}
            </p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        {status === "Approved" && (
          <Button onClick={handleDownloadPDF}>
            Download Policy PDF
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default FeedbackModal;
