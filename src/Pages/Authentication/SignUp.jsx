import React, { useState } from 'react';
import { Button, Card, Label, TextInput, FileInput, HelperText } from "flowbite-react";
import { NavLink, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");


  const location = useLocation()
      const navigate = useNavigate()
      const from = location.state?.from || '/'


      const onSubmit= (data)=>{
        console.log(data);
   const userInfo = {
          email: data.email,
          role: 'user', //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        }


        
      }

  return (
    <Card className="max-w-sm my-2 px-4">
      <h2 className='font-medium mx-auto text-white underline text-lg'>Sign Up</h2>
      <form className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Your Name</Label>
          </div>
          <TextInput id="name" type="text" placeholder="John Doe" required />
        </div>

        {/* Email */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your Email</Label>
          </div>
          <TextInput id="email" type="email" placeholder="name@example.com" required />
        </div>

        {/* Photo Upload */}
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="photo">Upload Photo</Label>
          </div>
          <FileInput id="photo" required />
        </div> */}


         <div>
                <Label className="mb-2 block" htmlFor="file-upload-helper-text">
        Upload Photo
      </Label>
      <FileInput id="file-upload-helper-text" />
      <HelperText className="mt-1 text-xs md:text-sm">SVG, PNG, JPG or GIF (MAX. 800x400px).</HelperText>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="At least 6 characters"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="hover:text-black">
          Sign Up
        </Button>

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
