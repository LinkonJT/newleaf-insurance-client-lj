import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiUser, HiOutlineClipboardList, HiCurrencyDollar, HiClipboardCheck, HiOutlineDocumentText, HiHome, HiLogout, HiUserGroup } from "react-icons/hi";
import useAuth from '../hooks/useAuth';

import AppNavbar from '../component/Shared/AppNavbar';
import AppFooter from '../component/Shared/AppFooter';

const DashboardLayout = () => {
  const { user, role, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <AppNavbar />
      <div className='flex flex-grow'>
        <Sidebar className="w-64 min-h-screen">
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem icon={HiHome} as={NavLink} to="/">
                Home
              </SidebarItem>
              <SidebarItem icon={HiUser} as={NavLink} to="/dashboard/profile">
                Profile
              </SidebarItem>

              {role === 'admin' && (
                <>
                  <SidebarItem icon={HiOutlineClipboardList} as={NavLink} to="/dashboard/manage-applications">
                    Manage Applications
                  </SidebarItem>
                  <SidebarItem icon={HiUserGroup} as={NavLink} to="/dashboard/manage-users">
                    Manage Users
                  </SidebarItem>
                  <SidebarItem icon={HiClipboardCheck} as={NavLink} to="/dashboard/manage-policies">
                    Manage Policies
                  </SidebarItem>
                  <SidebarItem icon={HiCurrencyDollar} as={NavLink} to="/dashboard/manage-transactions">
                    Manage Transactions
                  </SidebarItem>
                  <SidebarItem icon={HiOutlineDocumentText} as={NavLink} to="/dashboard/manage-blogs">
                    Manage Blogs
                  </SidebarItem>
                </>
              )}

              {role === 'agent' && (
                <>
                  <SidebarItem icon={HiUserGroup} as={NavLink} to="/dashboard/assigned-customers">
                    Assigned Customers
                  </SidebarItem>
                  <SidebarItem icon={HiOutlineDocumentText} as={NavLink} to="/dashboard/manage-blogs">
                    Manage Blogs
                  </SidebarItem>
                  <SidebarItem icon={HiClipboardCheck} as={NavLink} to="/dashboard/policy-clearance">
                    Policy Clearance
                  </SidebarItem>
                </>
              )}

              {role === 'customer' && (
                <>
                  <SidebarItem icon={HiOutlineClipboardList} as={NavLink} to="/dashboard/my-policies">
                    My Policies
                  </SidebarItem>
                  <SidebarItem icon={HiCurrencyDollar} as={NavLink} to="/dashboard/payment-status">
                    Payment Status
                  </SidebarItem>
                  <SidebarItem icon={HiCurrencyDollar} as={NavLink} to="/dashboard/payment">
                    Make Payment
                  </SidebarItem>
                  <SidebarItem icon={HiClipboardCheck} as={NavLink} to="/dashboard/claim-request">
                    Claim Request
                  </SidebarItem>
                </>
              )}

              <SidebarItem icon={HiLogout} onClick={handleLogout}>
                Logout
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>

        <main className='flex-grow p-4'>
          <Outlet />
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default DashboardLayout;
