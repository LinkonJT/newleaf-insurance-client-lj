import { useForm } from "react-hook-form";
import {
  Label,
  TextInput,
  Button,
  Textarea,
  FileInput,
  HelperText,
} from "flowbite-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";

const AddPolicy = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setUploadedImageUrl(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload a policy image");
      return;
    }

    const policyData = {
      ...data,
      policyImage: uploadedImageUrl,
    };

    try {
      const res = await axiosSecure.post("/policies", policyData);
      if (res.data.insertedId) {
        toast.success("Policy added successfully!");
        reset();
        setUploadedImageUrl("");
      }
    } catch (err) {
      console.error("Error adding policy:", err);
      toast.error("Failed to add policy.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto flex flex-col bg-gray-400 gap-2 p-4 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        Add New Policy
      </h2>

      {/* Upload Photo */}
      <div>
        <Label htmlFor="photo" className="mb-1 text-black">Upload Policy Image</Label>
        <FileInput id="photo" onChange={handleImageUpload} />
        <HelperText className="mt-1 text-xs md:text-sm">
          JPG, PNG, GIF (MAX 800x400px). Upload required.
        </HelperText>
        {errors.policyImage && (
          <p className="text-red-500 text-sm mt-1">Photo is required</p>
        )}
        {uploadedImageUrl && (
          <img
            src={uploadedImageUrl}
            alt="Preview"
            className="h-24 mt-2 rounded shadow border"
          />
        )}
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title" className="mb-1 text-black">
          Title
        </Label>
        <TextInput
          id="title"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category" className="mb-1 text-black">
          Category
        </Label>
        <TextInput
          id="category"
          placeholder="e.g. Life, Term, Whole"
          {...register("category", { required: true })}
        />
      </div>

      {/* Short Description */}
      <div>
        <Label htmlFor="shortDescription" className="mb-1 text-black">
          Short Description
        </Label>
        <TextInput
          id="shortDescription"
          placeholder="One-liner about the policy"
          {...register("shortDescription", { required: true })}
        />
      </div>

      {/* Full Description */}
      <div>
        <Label htmlFor="description" className="mb-1 text-black">
          Full Description
        </Label>
        <Textarea
          id="description"
          placeholder="Long description of the policy"
          rows={4}
          {...register("description", { required: true })}
        />
      </div>

      {/* Key Information */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eligibility">Eligibility</Label>
          <TextInput
            id="eligibility"
            placeholder="e.g. Individuals aged 18 to 60"
            {...register("eligibility", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="benefits">Benefits</Label>
          <TextInput
            id="benefits"
            placeholder="e.g. Death, Terminal Illness..."
            {...register("benefits", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="premiumCalculationLogic">Premium Logic</Label>
          <TextInput
            id="premiumCalculationLogic"
            placeholder="e.g. Based on age, gender..."
            {...register("premiumCalculationLogic", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="termLengthOptions">Term Length Options</Label>
          <TextInput
            id="termLengthOptions"
            placeholder="e.g. 10, 15, 20, 30 years"
            {...register("termLengthOptions", { required: true })}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="coverageRange">Coverage Range</Label>
          <TextInput
            id="coverageRange"
            placeholder="e.g. BDT 5 Lakh to 5 Crore"
            {...register("coverageRange", { required: true })}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="basePremiumRate">Base Premium Rate</Label>
          <TextInput
            id="basePremiumRate"
            placeholder="Base premium per thousand"
            {...register("basePremiumRate", { required: true })}
          />
        </div>
      </div>

      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading Image..." : "Add Policy"}
      </Button>
    </form>
  );
};

export default AddPolicy;
