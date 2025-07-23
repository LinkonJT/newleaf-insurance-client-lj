// src/pages/Dashboard/Agent/AssignedCustomerModal.jsx
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";

const AssignedCustomerModal = ({ show, onClose, customer }) => {
  if (!customer) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Customer Details</ModalHeader>
      <ModalBody>
        <div className="space-y-2 text-sm text-white">
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Policy Name:</strong> {customer.policyTitle || "N/A"}
          </p>
          <p>
            <strong>Premium Amount:</strong> ৳{customer.premiumAmount}
          </p>
          <p>
            <strong>Term Lengths:</strong> {customer.termLength} years
          </p>
          <p>
            <strong>Coverage Amount:</strong> ৳{customer.coverageAmount}
          </p>
          <p>
            <strong>Status:</strong> {customer.status}
          </p>
          <p>
            <strong>Application Date:</strong>{" "}
            {new Date(customer.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Inquiry:</strong> None{" "}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AssignedCustomerModal;
