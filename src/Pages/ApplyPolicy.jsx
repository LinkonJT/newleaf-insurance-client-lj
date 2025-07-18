import { useForm } from "react-hook-form";
import { Label, TextInput, Button, Textarea, Checkbox } from "flowbite-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";

const ApplyPolicy = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { id: policyId } = useParams(); 

  const onSubmit = async (data) => {


      const applicationData = {
    ...data,
    policyId,
    userId: user?.uid || user?._id, 
    status: "pending",
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
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto flex flex-col gap-3 p-4 bg-blue-100 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold text-center text-gray-800">Apply for Policy</h2>

      {/* Personal Info */}
      <div>
        <Label htmlFor="name">Full Name</Label>
        <TextInput
          id="name"
          defaultValue={user?.displayName}
          readOnly
          {...register("name")}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          defaultValue={user?.email}
          readOnly
          {...register("email")}
        />
      </div>

      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <TextInput id="dob" type="date" {...register("dob", { required: true })} />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <TextInput id="address" placeholder="Enter full address" {...register("address", { required: true })} />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <TextInput id="phone" type="tel" placeholder="01XXXXXXXXX" {...register("phone", { required: true })} />
      </div>

      <div>
        <Label htmlFor="nid">NID Number</Label>
        <TextInput id="nid" placeholder="Your National ID number" {...register("nid", { required: true })} />
      </div>

      {/* Nominee Info */}
      <h3 className="font-semibold mt-4">Nominee Information</h3>

      <div>
        <Label htmlFor="nomineeName">Nominee Name</Label>
        <TextInput id="nomineeName" placeholder="Nominee full name" {...register("nomineeName", { required: true })} />
      </div>

      <div>
        <Label htmlFor="relationship">Relationship with Nominee</Label>
        <TextInput id="relationship" placeholder="e.g. Spouse, Child, Parent" {...register("relationship", { required: true })} />
      </div>

      <div>
        <Label htmlFor="nomineeNid">Nominee NID (optional)</Label>
        <TextInput id="nomineeNid" placeholder="Nominee NID (if available)" {...register("nomineeNid")} />
      </div>

      {/* Health Disclosure */}
      <h3 className="font-semibold mt-4">Health Disclosure</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <Checkbox id="heart" {...register("healthIssues")} value="Heart Disease" />
          <Label htmlFor="heart" className="ml-2">Heart Disease</Label>
        </div>
        <div>
          <Checkbox id="diabetes" {...register("healthIssues")} value="Diabetes" />
          <Label htmlFor="diabetes" className="ml-2">Diabetes</Label>
        </div>
        <div>
          <Checkbox id="pressure" {...register("healthIssues")} value="High Blood Pressure" />
          <Label htmlFor="pressure" className="ml-2">High Blood Pressure</Label>
        </div>
        <div>
          <Checkbox id="smoker" {...register("healthIssues")} value="Smoker" />
          <Label htmlFor="smoker" className="ml-2">Smoker</Label>
        </div>
        <div>
          <Checkbox id="kidney" {...register("healthIssues")} value="Kidney Disease" />
          <Label htmlFor="kidney" className="ml-2">Kidney Disease</Label>
        </div>
        <div>
          <Checkbox id="none" {...register("healthIssues")} value="None of the above" />
          <Label htmlFor="none" className="ml-2">None of the above</Label>
        </div>
      </div>

      <div className="mt-2">
        <Label htmlFor="other">Other Health Issues (optional)</Label>
        <Textarea
          id="other"
          placeholder="Describe any other condition"
          {...register("otherHealthInfo")}
        />
      </div>

      <Button type="submit" className="mt-4">Submit Application</Button>
    </form>
  );
};

export default ApplyPolicy;
