import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
  Textarea,
  Button,
  FileInput,
  HelperText,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PolicyModal = ({ mode = "add", existingData = null, onSuccess, buttonText }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingData?.policyImage || "");
  const axiosSecure = useAxiosSecure();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: existingData || {},
  });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
      { method: "POST", body: formData }
    ).then(r => r.json());
    setImageUrl(res.data.url);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, policyImage: imageUrl };
    try {
      let res;
      if (mode === "edit" && existingData?._id) {
        res = await axiosSecure.patch(`/policies/${existingData._id}`, payload);
      } else {
        res = await axiosSecure.post("/policies", payload);
      }
      if (res.data.insertedId || res.data.modifiedCount) {
        Swal.fire("Success!", `Policy ${mode === "edit" ? "updated" : "added"} successfully.`, "success");
        setOpenModal(false);
        reset();
        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>{buttonText || (mode === "edit" ? "Edit Policy" : "+ Add Policy")}</Button>
      <Modal show={openModal} dismissible onClose={() => setOpenModal(false)}>
        <ModalHeader>{mode === "edit" ? "Edit Policy" : "Add New Policy"}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className="space-y-4">
            {/* Image Upload */}
            <div>
              <Label htmlFor="photo">Upload Photo</Label>
              <FileInput id="photo" onChange={handleImageUpload} />
              <HelperText>SVG, PNG, JPG or GIF (optimize 800×400px)</HelperText>
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="mt-2 max-w-full h-auto" />
              )}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Policy Title</Label>
              <TextInput id="title" {...register("title", { required: true })} />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <TextInput id="category" {...register("category", { required: true })} />
              {errors.category && <span className="text-red-500">Category is required</span>}
            </div>

            {/* Short Description */}
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <TextInput id="shortDescription" {...register("shortDescription", { required: true })} />
              {errors.shortDescription && <span className="text-red-500">Required</span>}
            </div>

            {/* Full Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description", { required: true })} rows={4} />
              {errors.description && <span className="text-red-500">Required</span>}
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eligibility">Eligibility</Label>
                <TextInput id="eligibility" {...register("eligibility", { required: true })} />
              </div>
              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <TextInput id="benefits" {...register("benefits", { required: true })} />
              </div>
              <div>
                <Label htmlFor="premiumCalculationLogic">Premium Logic</Label>
                <TextInput id="premiumCalculationLogic" {...register("premiumCalculationLogic", { required: true })} />
              </div>
              <div>
                <Label htmlFor="termLengthOptions">Term Options</Label>
                <TextInput id="termLengthOptions" {...register("termLengthOptions", { required: true })} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="coverageRange">Coverage Range</Label>
                <TextInput id="coverageRange" {...register("coverageRange", { required: true })} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="basePremiumRate">Base Premium Rate</Label>
                <TextInput id="basePremiumRate" {...register("basePremiumRate", { required: true })} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" isProcessing={isSubmitting}>{mode === "edit" ? "Update" : "Add Policy"}</Button>
            <Button color="alternative" onClick={() => setOpenModal(false)}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default PolicyModal;
