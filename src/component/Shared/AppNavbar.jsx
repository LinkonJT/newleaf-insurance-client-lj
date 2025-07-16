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
        <Navbar fluid rounded>
      <NavbarBrand href="">
        <img src={logo} className="mr-3 w-10 rounded-full" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NewLeaf </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        
            {
          user ? (
            <Button onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <NavLink to="/signin">
              <Button>Sign In</Button>
            </NavLink>
          )
        }


        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink to='/' className="text-gray-400 hover:text-white">Home</NavLink>
        <NavLink to='/all-policies' className="text-gray-400 hover:text-white">All Policies</NavLink>
        <NavLink to='/blogs' className="text-gray-400 hover:text-white">Blogs</NavLink>
        <NavLink to='/dashboard' className="text-gray-400 hover:text-white">Dashboard</NavLink>
      
      </NavbarCollapse>
    </Navbar>
    );
};

export default AppNavbar;