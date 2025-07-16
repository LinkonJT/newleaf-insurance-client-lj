import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';
import AppNavbar from '../component/Shared/AppNavbar';
import AppFooter from '../component/Shared/AppFooter';

const DashboardLayout = () => {
  const { user, role } = useAuth(); 

  return (
    <div className='flex flex-col min-h-screen '>
      <div>
        <AppNavbar></AppNavbar>
      </div>
   

   <div className='flex-grow max-w-10/12 '> 
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarCollapse icon={HiShoppingBag} label="E-commerce">
            <SidebarItem href="#">Products</SidebarItem>
            <SidebarItem href="#">Sales</SidebarItem>
            <SidebarItem href="#">Refunds</SidebarItem>
            <SidebarItem href="#">Shipping</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
   </div>
     <AppFooter></AppFooter>
    </div>

  );
};

export default DashboardLayout;

