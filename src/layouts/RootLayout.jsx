import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../component/Shared/AppFooter';
import AppNavbar from '../component/Shared/AppNavbar';
import AppFooter from '../component/Shared/AppFooter';

const RootLayout = () => {
    return (
         <div  className='flex flex-col min-h-screen '>
            <AppNavbar></AppNavbar>
            <main className='flex-grow max-w-10/12 mx-auto'>
               <Outlet></Outlet>
            </main>
            <AppFooter></AppFooter>
        </div>
    );
};

export default RootLayout;