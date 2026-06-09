import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Clipboard, CreditCard } from 'lucide-react';
import { logout } from '../../../features/auth/authSlice';
import AdminHeader from './components/AdminHeader';
import AdminStats from './components/AdminStats';
import ActiveMembers from './components/ActiveMembers';
import ApprovalPipeline from './components/ApprovalPipeline';
import PricingPlans from './components/PricingPlans';
import NewRequests from './components/NewRequests';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  const role = user?.role;


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };


  if (role !== 'ADMIN' && role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Accès refusé</h1>
          <p className="mb-6 text-gray-700">Vous n'avez pas les permissions d'administrateur</p>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }


  const today = new Date()
    .toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <AdminHeader onLogout={handleLogout} today={today} />
      <AdminStats />


      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex flex-1 items-center gap-3 rounded-lg border px-5 py-3 text-base font-bold transition-all duration-200 ${activeTab === 'manage'
              ? 'border-[#5A8D84] bg-white text-[#334155] shadow-sm'
              : 'border-gray-100 bg-white text-gray-400'
              }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md ${activeTab === 'manage' ? 'bg-[#5A8D84] text-white' : 'bg-[#E9F3F1] text-[#5A8D84]'
                }`}
            >
              <Clipboard size={14} />
            </div>
            Gérer les annonces
          </button>


          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex flex-1 items-center gap-3 rounded-lg border px-5 py-3 text-base font-bold transition-all duration-200 ${activeTab === 'pricing'
              ? 'border-[#5A8D84] bg-white text-[#334155] shadow-sm'
              : 'border-gray-100 bg-white text-gray-400'
              }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md ${activeTab === 'pricing' ? 'bg-[#5A8D84] text-white' : 'bg-[#E9F3F1] text-[#5A8D84]'
                }`}
            >
              <CreditCard size={14} />
            </div>
            Tarifs et demandes
          </button>
        </div>
      </div>


      {activeTab === 'manage' && (
        <>
          <ActiveMembers />
          <ApprovalPipeline />
        </>
      )}


      {activeTab === 'pricing' && (
        <>
          <PricingPlans />
          <NewRequests />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;