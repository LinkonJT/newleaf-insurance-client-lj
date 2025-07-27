import { useState } from "react";
import { updateProfile } from "firebase/auth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { Card, Label, TextInput, FileInput, HelperText, Button } from "flowbite-react";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const lastLogin = user?.metadata?.lastSignInTime;
  const createdAt = user?.metadata?.creationTime;

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imageUploadUrl, formData);
    setPhotoURL(res.data.data.url);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

     await axiosSecure.patch(`/users`, {
  email: user?.email,
  name,
  photoURL,
});

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const roleStyle =
    role === "admin"
      ? "bg-red-600"
      : role === "agent"
      ? "bg-blue-600"
      : "bg-green-600";

  return (
    <Card className="max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-semibold text-center text-white">My Profile</h2>

      <div className="flex flex-col items-center mt-4">
        <img
          src={photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full border shadow mb-2"
        />
        <span
          className={`px-3 py-1 rounded-full text-white text-sm capitalize ${roleStyle}`}
        >
          {role}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="photo" value="Upload Photo" />
          <FileInput id="photo" onChange={handleImageUpload} />
          <HelperText className="text-xs md:text-sm">
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </HelperText>
        </div>

        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            value={user?.email}
            readOnly
            disabled
          />
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <strong>Last Login:</strong>{" "}
            {lastLogin ? new Date(lastLogin).toLocaleString() : "N/A"}
          </p>
          <p>
            <strong>Account Created:</strong>{" "}
            {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
          </p>
        </div>

        <Button onClick={handleSave} isProcessing={loading} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
};

export default Profile;
