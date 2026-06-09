import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';

const GoogleCallbackView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');


    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        dispatch(setCredentials({ user, token }));

        toast.success(`Bienvenue ${user.name || user.email}!`);

        setTimeout(() => {
          if (user.role === 'ADMIN' || user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dash');
          }
        }, 100);
      } catch (error) {
        toast.error('Login failed. Please try again.');
        navigate('/auth/login');
      }
    } else {
      const error = params.get('error');
      if (error) {
        toast.error('Google login failed. Please try again.');
      }
      navigate('/auth/login');
    }
  }, [location, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2D5A4E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Connexion en cours...</p>
        <p className="text-gray-400 text-sm mt-2">Veuillez patienter</p>
      </div>
    </div>
  );
};

export default GoogleCallbackView;