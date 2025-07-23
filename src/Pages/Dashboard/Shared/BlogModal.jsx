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
import useAuth from "../../../hooks/useAuth";

const BlogModal = ({ onSuccess }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

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
    const payload = {
      ...data,
      image: imageUrl,
      author: user?.displayName,
      authorEmail: user?.email,
      publishedAt: new Date(),
      totalVisit: 0
    };

    try {
      const res = await axiosSecure.post("/blogs", payload);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Blog added successfully.", "success");
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
      <Button onClick={() => setOpenModal(true)}>+ Add Blog</Button>
      <Modal show={openModal} dismissible onClose={() => setOpenModal(false)}>
        <ModalHeader>Add New Blog</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* Author */}
            <div>
              <Label htmlFor="author">Author</Label>
              <TextInput id="author" value={user?.displayName} readOnly />
            </div>

          </ModalBody>
          <ModalFooter>
            <Button type="submit" isProcessing={isSubmitting}>Publish</Button>
            <Button color="alternative" onClick={() => setOpenModal(false)}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default BlogModal;
