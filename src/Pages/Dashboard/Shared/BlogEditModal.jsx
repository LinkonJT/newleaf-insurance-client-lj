import React, { useState } from "react";
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

const BlogEditModal = ({ existingData, onSuccess }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingData?.image || "");
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
const { _id, ...rest } = data; 
   
    const payload = {
         ...rest,
      image: imageUrl,
      updatedAt: new Date()
    };

    try {
      const res = await axiosSecure.patch(`/blogs/${existingData._id}`, payload);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Blog updated successfully.", "success");
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
      <Button onClick={() => setOpenModal(true)} color="gray">Edit</Button>
      <Modal show={openModal} dismissible onClose={() => setOpenModal(false)}>
        <ModalHeader>Edit Blog</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-400">
          <ModalBody className="space-y-4">
            {/* Image Upload */}
            <div>
              <Label htmlFor="photo">Upload Blog Image</Label>
              <FileInput id="photo" onChange={handleImageUpload} />
              <HelperText>Recommended: 800×400px</HelperText>
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="mt-2 max-w-full h-auto" />
              )}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Blog Title</Label>
              <TextInput id="title" {...register("title", { required: true })} />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" {...register("content", { required: true })} rows={5} />
              {errors.content && <span className="text-red-500">Content is required</span>}
            </div>

              {/* Author Email */}
            <div>
              <Label htmlFor="author">Author Name</Label>
              <TextInput id="author" value={existingData?.author} readOnly />
            </div>

            {/* Author Email */}
            <div>
              <Label htmlFor="authorEmail">Author Email</Label>
              <TextInput id="authorEmail" value={existingData?.authorEmail} readOnly />
            </div>

          </ModalBody>
          <ModalFooter>
            <Button type="submit" isProcessing={isSubmitting}>Update</Button>
            <Button color="alternative" onClick={() => setOpenModal(false)}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default BlogEditModal;
