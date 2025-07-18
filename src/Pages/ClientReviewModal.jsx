import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Rating, RatingStar, Textarea } from "flowbite-react";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure"; // adjust path as needed
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const ClientReviewModal = ({ policyId, policyTitle }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === "") {
      Swal.fire("Error", "Please provide both rating and feedback.", "warning");
      return;
    }

    const reviewData = {
      userName: user?.displayName,
      userEmail: user?.email,
      policyId,
      policyTitle,
      rating,
      feedback,
      date: new Date(),
    };

    try {
      setSubmitting(true);
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your review has been submitted.", "success");
        setOpenModal(false);
        setRating(0);
        setFeedback("");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while submitting the review.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="text-xs">Give Review</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Give Us Your Valuable Feedback!</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="mb-4 flex items-center">
              <Rating>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <RatingStar
                    key={starValue}
                    filled={starValue <= rating}
                    onClick={() => setRating(starValue)}
                    className="cursor-pointer"
                  />
                ))}
              </Rating>
              <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating > 0 ? `${rating} out of 5 stars` : 'Select your rating'}
              </span>
            </div>

            <div>
              <Label htmlFor="client-feedback">Your Feedback</Label>
              <Textarea
                id="client-feedback"
                placeholder="Write your feedback here"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} isProcessing={submitting}>
            Submit Review
          </Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ClientReviewModal;
