import React, { useState } from 'react';
import { Button, Card, Label, TextInput, FileInput, HelperText } from "flowbite-react";
import { NavLink, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const SignUp = () => {
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
 const axiosInstance = useAxios();

  const location = useLocation()
      const navigate = useNavigate()
      const from = location.state?.from || '/'



  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // save/update user profile in MongoDB databse
        const userInfo = {
          email: data.email,
          role: 'Customer', //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);

        //update user profile in Firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
          updateUserProfile(userProfile)
          .then(() => {
            toast.success('Registered successfully'); 
            navigate(from);
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to update profile');
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || 'Registration failed');
      });
  };


  /**Hadle image upload in imbb */
  const handleImageUpload = async (e) => { 
    const image = e.target.files[0];

    console.log("uploaded image details", image);

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <Card className="max-w-sm my-2 px-4">
      <h2 className='font-medium mx-auto text-white underline text-lg'>Sign Up Now!!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div>
       
        <Label htmlFor="name" value="Your Name">Your Name</Label> 
        <TextInput
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Name is required</p>
        )}
      </div>

{/* Photo upload */}


              <div>
        <Label className="mb-2 block" htmlFor="photo">Upload Photo</Label>
        <FileInput
        onChange={handleImageUpload}
          id="photo"
          
        />
        <HelperText className="mt-1 text-xs md:text-sm">
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </HelperText>
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">Photo is required</p>
        )}
      </div>
        {/* Email */}
        <div>
        <Label className="mb-2 block" htmlFor="email">Your Email</Label>
        <TextInput
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">Email is required</p>
        )}
      </div>



       {/* Password */}
      <div>
        <Label className="mb-2 block" htmlFor="password">Password</Label>
        <TextInput
  id="password"
  type="password"
  placeholder="At least 6 characters"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      message: "Password must include uppercase and lowercase letters",
    },
  })}
/>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message || "Password is required"}
          </p>
        )}
      </div>

        {/* Submit Button */}
        <Button type="submit" className="hover:text-black">Sign Up</Button>

                 <div className="space-y-3">
                  <Button onClick type="button" className="btn bg-base-100 btn-outline w-full hover:text-black">
                    <FcGoogle size={24} /> signUp with Google
                  </Button>
                  <p className="font-semibold text-center text-gray-200 gap-2">
                    Already Have An Account?
                    <NavLink className="text-blue-700 hover:underline ml-2" to="/signin">
                      SignIn
                    </NavLink>
                  </p>
                </div>
     
            
      </form>
    </Card>
  );
};

export default SignUp;
