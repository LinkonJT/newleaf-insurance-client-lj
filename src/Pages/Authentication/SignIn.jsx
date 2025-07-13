import React from 'react';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router';

const SignIn = () => {
    return (
         <Card className="max-w-sm my-5">
          <h2 className='font-medium mx-auto text-white underline text-lg'>Sign In here</h2>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Sign In</Button>

          
         <div className="space-y-3">
          <Button onClick type="button" className="btn bg-base-100 btn-outline w-full">
            <FcGoogle size={24} /> Login with Google
          </Button>
          <p className="font-semibold text-center text-gray-200 gap-2">
            Don't Have An Account?
            <NavLink className="text-blue-700 hover:underline ml-2" to="/signup">
              SignUp
            </NavLink>
          </p>
        </div>

      </form>

    </Card>
    );
};

export default SignIn;