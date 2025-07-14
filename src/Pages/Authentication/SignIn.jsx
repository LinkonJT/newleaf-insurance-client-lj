import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const SignIn = () => {

const { register, handleSubmit, watch, formState: { errors } } = useForm();
 const {signInUser} = useAuth()
 const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || '/'

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem('access-token', token); // Store token
        toast.success('Login successful');
        navigate(from); // Go back to previous page
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || 'Login failed');
      });
  };
  
    return (
         <Card className="max-w-sm my-5">
          <h2 className='font-medium mx-auto text-white underline text-lg'>Sign In here</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit" className='hover:text-black'>Sign In</Button>

          
       <SocialLogin></SocialLogin>
   <p className="font-semibold text-center text-gray-200 gap-2">
                    Don't Have An Account?
                    <NavLink className="text-blue-700 hover:underline ml-2" to="/signup">
                      SignUp
                    </NavLink>
                  </p>
      </form>

    </Card>
    );
};

export default SignIn;