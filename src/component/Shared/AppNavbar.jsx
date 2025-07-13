import React from 'react';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import logo from '../../assets/Logo_nLeaf.png'
import { NavLink } from 'react-router';

const AppNavbar = () => {
    return (
        <Navbar fluid rounded>
      <NavbarBrand href="">
        <img src={logo} className="mr-3 w-10 rounded-full" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NewLeaf </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button>Login</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink to='/' className="text-gray-400 hover:text-white">Home</NavLink>
        <NavLink to='/' className="text-gray-400 hover:text-white">All Policies</NavLink>
        <NavLink to='/' className="text-gray-400 hover:text-white">Blogs</NavLink>
        <NavLink to='/' className="text-gray-400 hover:text-white">Dashboard</NavLink>
      
      </NavbarCollapse>
    </Navbar>
    );
};

export default AppNavbar;