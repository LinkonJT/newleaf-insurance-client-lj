import React from 'react';
import useAuth from '../../hooks/useAuth';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { Button } from 'flowbite-react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
      const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from || '/';
        const axiosInstance = useAxios();



const handleGoogleSignIn = () =>{
    signInWithGoogle()
    .then(async (result)=>{
        const user = result.user;
        console.log(result.user)

          //67-4 update user profile in MongoDB databse/JWT token
        const userInfo = {
          email: user.email,
          role: 'customer', //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        }

        
        const res = await axiosInstance.post('/users', userInfo);
        console.log('user update info:', res.data);

        navigate(from);
    }).catch(error=>{
        console.log(error)
    })
}

    return (
<div className="space-y-3">
                  <Button onClick={handleGoogleSignIn} type="button" className="btn bg-base-100 btn-outline w-full hover:text-black">
                    <FcGoogle size={24} /> signUp with Google
                  </Button>
                  <p className="font-semibold text-center text-gray-200 gap-2">
                    Already Have An Account?
                    <NavLink className="text-blue-700 hover:underline ml-2" to="/signin">
                      SignIn
                    </NavLink>
                  </p>
                </div>
    );
};

export default SocialLogin;