import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import AppSpinner from '../component/AppSpinner';

const PrivateRoute = ({children}) => {

const {user, loading} = useAuth();
const location = useLocation()



if(loading){
    return <AppSpinner></AppSpinner>
}

if(!user){
   return <Navigate state={{from: location.pathname}} to='/signin'></Navigate>
}

    return children;
};

export default PrivateRoute;