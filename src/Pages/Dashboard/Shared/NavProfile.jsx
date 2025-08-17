import { useState } from "react";
import { updateProfile } from "firebase/auth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { Card, Label, TextInput, FileInput, HelperText, Button } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router";

const NavProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const lastLogin = user?.metadata?.lastSignInTime;
  const createdAt = user?.metadata?.creationTime;


  const roleStyle =
    role === "admin"
      ? "bg-red-600"
      : role === "agent"
      ? "bg-blue-600"
      : "bg-green-600";

  return (
    <Card className="mx-auto ">
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
<Link to='/dashboard/profile'><Button >Edit</Button></Link>
        
      
    </Card>
  );
};

export default NavProfile;
