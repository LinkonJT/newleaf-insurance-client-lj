import { useForm } from "react-hook-form";
import { Label, TextInput, Button, Textarea, Checkbox } from "flowbite-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const ApplyPolicy = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { id: policyId } = useParams(); 
  const navigate = useNavigate()

      const location = useLocation();
const premium = location.state?.premium;

  const onSubmit = async (data) => {



      const applicationData = {
    ...data,
    policyId,
    userId: user?.uid || user?._id, 
    status: "pending",
     premiumAmount: premium,
    createdAt: new Date(),
  };

      try {
    const res = await axiosSecure.post("/applications", applicationData);
    if (res.data.insertedId) {
      toast.success("Application submitted successfully!");
      reset();
    }
  } catch (err) {
    console.error("Application error:", err);
    toast.error("Submission failed.");
  }

//   navigate("/dashboard")
};

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full mx-auto bg-gray-400 p-4 sm:p-8 lg:p-12 rounded-xl shadow-md"
>
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Apply for Policy
  </h2>

  {/* Personal Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="name">Full Name</Label>
      <TextInput
        id="name"
        defaultValue={user?.displayName}
        readOnly
        {...register("name")}
        className="w-full"
      />
    </div>

    <div>
      <Label htmlFor="email">Email</Label>
      <TextInput
        id="email"
        defaultValue={user?.email}
        readOnly
        {...register("email")}
        className="w-full"
      />
    </div>

    <div>
      <Label htmlFor="dob">Date of Birth</Label>
      <TextInput
        id="dob"
        type="date"
        {...register("dob", { required: true })}
        className="w-full"
      />
    </div>

    <div>
      <Label htmlFor="phone">Phone Number</Label>
      <TextInput
        id="phone"
        type="tel"
        placeholder="01XXXXXXXXX"
        {...register("phone", { required: true })}
        className="w-full"
      />
    </div>

    <div className="md:col-span-2">
      <Label htmlFor="address">Address</Label>
      <TextInput
        id="address"
        placeholder="Enter full address"
        {...register("address", { required: true })}
        className="w-full"
      />
    </div>

    <div className="md:col-span-2">
      <Label htmlFor="nid">NID Number</Label>
      <TextInput
        id="nid"
        placeholder="Your National ID number"
        {...register("nid", { required: true })}
        className="w-full"
      />
    </div>
  </div>

  {/* Nominee Info */}
  <h3 className="text-lg font-semibold mt-6">Nominee Information</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    <div>
      <Label htmlFor="nomineeName">Nominee Name</Label>
      <TextInput
        id="nomineeName"
        placeholder="Nominee full name"
        {...register("nomineeName", { required: true })}
        className="w-full"
      />
    </div>

    <div>
      <Label htmlFor="relationship">Relationship with Nominee</Label>
      <TextInput
        id="relationship"
        placeholder="e.g. Spouse, Child, Parent"
        {...register("relationship", { required: true })}
        className="w-full"
      />
    </div>

    <div className="md:col-span-2">
      <Label htmlFor="nomineeNid">Nominee NID (optional)</Label>
      <TextInput
        id="nomineeNid"
        placeholder="Nominee NID (if available)"
        {...register("nomineeNid")}
        className="w-full"
      />
    </div>
  </div>

  {/* Health Disclosure */}
  <h3 className="text-lg font-semibold mt-6">Health Disclosure</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
    {[
      ["heart", "Heart Disease"],
      ["diabetes", "Diabetes"],
      ["pressure", "High Blood Pressure"],
      ["smoker", "Smoker"],
      ["kidney", "Kidney Disease"],
      ["none", "None of the above"],
    ].map(([id, label]) => (
      <div key={id} className="flex items-center gap-2">
        <Checkbox id={id} {...register("healthIssues")} value={label} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    ))}
  </div>

  <div className="mt-4">
    <Label htmlFor="other">Other Health Issues (optional)</Label>
    <Textarea
      id="other"
      placeholder="Describe any other condition"
      {...register("otherHealthInfo")}
      className="w-full"
    />
  </div>

  <Button type="submit" className="mt-6 w-full sm:w-auto self-center">
    Submit Application
  </Button>
</form>

  );
};

export default ApplyPolicy;
