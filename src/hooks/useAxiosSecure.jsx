// src/hooks/useAxiosSecure.jsx

import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  //  Request interceptor
  // axiosSecure.interceptors.request.use(
  //   (config) => {
  //     if (user?.accessToken) {
  //       config.headers.Authorization = `Bearer ${user.accessToken}`;
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );


  axiosSecure.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    
  },
  (error) => Promise.reject(error)
);
  //  Response interceptor
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      console.log("Response interceptor status", status);

      if (status === 403) {
        toast.error("Access denied. You are not authorized.");
        navigate('/forbidden');
      } else if (status === 401) {
         toast.warning("Session expired. Please sign in again.");
        logOut()
          .then(() => navigate('/signin'))
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
