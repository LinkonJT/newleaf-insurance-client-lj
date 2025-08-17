import React from 'react';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import logo from '../../assets/Logo_nLeaf.png'
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import AppSpinner from '../AppSpinner';

const AppNavbar = () => {

   const { user, loading, logOut } = useAuth();

const handleSignOut = async () => {
  try {
    await logOut();
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

if (loading) {
    return <AppSpinner></AppSpinner>
  }


    return (
          <Navbar fluid className="sticky top-0 z-50 w-full bg-green-600/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md">
      <div className="md:max-w-10/12 mx-auto w-full flex items-center justify-between">
        <NavbarBrand href="">
        <img src={logo} className="mr-3 w-8 md:w-10 rounded-full" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-lg md:text-xl font-semibold dark:text-white">NewLeaf </span>
      </NavbarBrand>
      <div className="flex md:order-2 items-center gap-2">
        
            {
          user ? (
            <>
           <div className='flex items-center gap-2'>
             <span className="text-sm px-3 py-1 bg-green-200 dark:bg-gray-700 text-green-800 dark:text-gray-200 rounded-full font-medium">
              {user.displayName || user.email}
            </span>
            <Button className='btn btn-3xl' onClick={handleSignOut}>Sign Out</Button>
           </div>
            </>
          ) : (
            <NavLink to="/signin">
              <Button className='btn btn-3xl'>Sign In</Button>
            </NavLink>
          )
        }

<NavbarToggle />
      
      </div>

        
 
      </div>

           <NavbarCollapse className="md:flex md:justify-end">
        <NavLink to='/' className="text-gray-400 hover:text-white">Home</NavLink>
        <NavLink to='/all-policies' className="text-gray-400 hover:text-white">All Policies</NavLink>
        <NavLink to='/blogs' className="text-gray-400 hover:text-white">Blogs</NavLink>
        <NavLink to='/about' className="text-gray-400 hover:text-white">About</NavLink>
          {user && (
              <>
      <NavLink to='/dashboard' className="text-gray-400 hover:text-white">Dashboard</NavLink>
      <NavLink to='/navProfile' className="text-gray-400 hover:text-white">Profile</NavLink>
    </>
        )}
      
      </NavbarCollapse >
    </Navbar>
    );
};

export default AppNavbar;