import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import AnnouncementsList from './components/AnnouncementsList';
import { useSignOutMutation } from '../../../features/api/authApi';
import { useGetMeQuery } from '../../../features/api/userApi';

const DashboardView = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: currentUser, isLoading } = useGetMeQuery({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut, { isLoading: isSigningOut }] = useSignOutMutation();

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(logout());
      toast.error('Erreur lors de la déconnexion');
      navigate('/');
    }
  };



  const userName = currentUser?.name || 'Utilisateur';
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <DashboardHeader
        userName={userName}
        onLogout={handleLogout}
        today={today}
      />
      <DashboardStats currentUser={currentUser} />
      <AnnouncementsList currentUser={currentUser} />
    </div>
  );
};

export default DashboardView;
