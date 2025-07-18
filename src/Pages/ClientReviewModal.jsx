import React from 'react';

import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Rating, RatingStar, Textarea } from "flowbite-react";
import { useState } from "react";


const ClientReviewModal = () => {


 const [openModal, setOpenModal] = useState(false);
 const [rating, setRating] = useState(0);

    return (
     <>
      <Button onClick={() => setOpenModal(true)} className='text-xs'>Give Review</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
              <div className="mb-4 flex items-center">
     <Rating>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <RatingStar
                    key={starValue}
                    filled={starValue <= rating}
                    onClick={() => setRating(starValue)}
                    className="cursor-pointer" // Make stars clickable
                  />
                ))}
              </Rating>
               <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating > 0 ? `${rating} out of 5 stars` : 'Select your rating'}
              </span>
      </div>
            <div className="mt-4">
                <Label htmlFor="client-feedback">Client Feedback</Label>
                <Textarea
                  id="client-feedback"
                  placeholder="Give your feedback here"
                
                  className="w-full"
                  rows={4} 
                />
              </div>
          </div>
        </ModalBody>
        <ModalFooter>

          <Button onClick={() => setOpenModal(false)}>Submit Review</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
    );
};

export default ClientReviewModal;