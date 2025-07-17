import { useForm } from "react-hook-form";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPolicy = () => {
  


 const { register, handleSubmit, reset } = useForm();

 const axiosSecure = useAxiosSecure();

const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.post("/policies", data);
    if (res.data.insertedId) {
      toast.success("Policy added successfully!");
      reset();
    }
  } catch (err) {
    console.error("Error adding policy:", err);
    toast.error("Failed to add policy.");
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto flex flex-col bg-blue-200 gap-2 p-2 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center text-gray-800">Add New Policy</h2>

     
    {/* Photo URL */}
      <div>
        <Label htmlFor="photoUrl" className="mb-1 text-black">Photo URL</Label>
        
        <TextInput id="photoUrl" placeholder="https://example.com/policy.jpg" {...register("policyImage", { required: true })} shadow />
      </div>

      {/* Title */}
      <div>
       <Label htmlFor="title" className="mb-1 text-black">Title</Label> 
        <TextInput id="title" placeholder="Enter title" {...register("title", { required: true })} />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category" value="Category" className="mb-1 text-black">Category</Label>
        <TextInput id="category" placeholder="e.g. Life, Term, Whole" {...register("category", { required: true })} />
      </div>

      {/* Short Description */}
      <div>
        <Label htmlFor="shortDescription" value="Short Description">Short Description</Label>
        <TextInput id="shortDescription" placeholder="One-liner about the policy" {...register("shortDescription", { required: true })} />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" value="Full Description">Description</Label>
        <Textarea id="description" placeholder="Long description of the policy" rows={4} {...register("description", { required: true })} />
      </div>

      {/* Key Information */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eligibility" value="Eligibility">Eligibility</Label>
          <TextInput id="eligibility" placeholder="e.g. Individuals aged 18 to 60" {...register("eligibility", { required: true })} />
        </div>

        <div>
          <Label htmlFor="benefits" value="Benefits">Benefits</Label>
          <TextInput id="benefits" placeholder="e.g. Death, Terminal Illness..." {...register("benefits", { required: true })} />
        </div>

        <div>
          <Label htmlFor="premiumCalculationLogic" value="Premium Calculation Logic">Premium Calculation Logic</Label>
          <TextInput id="premiumCalculationLogic" placeholder="e.g. Based on age, gender..." {...register("premiumCalculationLogic", { required: true })} />
        </div>

        <div>
          <Label htmlFor="termLengthOptions" value="Term Length Options">Term Length Options</Label>
          <TextInput id="termLengthOptions" placeholder="e.g. 10, 15, 20, 30 years" {...register("termLengthOptions", { required: true })} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="coverageRange" >Coverage Range</Label>
          <TextInput id="coverageRange" placeholder="e.g. BDT 5 Lakh to 5 Crore" {...register("coverageRange", { required: true })} />
        </div>
      </div>

      <Button type="submit">Add Policy</Button>
    </form>
  );
};

export default AddPolicy;
