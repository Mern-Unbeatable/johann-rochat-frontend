import React from 'react';
import { Building2, Zap, CheckCircle2, User, CircleDollarSign } from 'lucide-react';

const DashboardStats = ({ currentUser }) => {

  const totalAnnouncements = currentUser?.listings?.length || 0;
  const userCredits = currentUser?.credits || 0;
  const pendingImprovements = currentUser?.improvementRequests?.filter(
    req => req.status === 'PENDING' || req.status === 'IMPROVEMENT_REQUESTED'
  )?.length || 0;

  // Fix: Handle both string and object cases for package
  let userPlan = 'GRATUIT';
  if (currentUser?.package) {
    // If package is an object with name property
    if (typeof currentUser.package === 'object' && currentUser.package.name) {
      userPlan = currentUser.package.name;
    }
    // If package is a string
    else if (typeof currentUser.package === 'string') {
      userPlan = currentUser.package;
    }
  }
  // If packageId exists but no package object
  else if (currentUser?.packageId && typeof currentUser.packageId === 'string') {
    userPlan = currentUser.packageId;
  }

  const formatPlanName = (plan) => {
    if (!plan || plan === 'null' || plan === 'undefined') return 'GRATUIT';
    if (typeof plan !== 'string') return 'GRATUIT';
    if (plan === 'PREMIUM') return 'PREMIUM';
    if (plan === 'PRO') return 'PRO';
    if (plan === 'GRATUIT') return 'GRATUIT';
    return plan.toUpperCase();
  };

  const statItems = [
    {
      icon: Building2,
      color: 'text-[#374151]',
      bgColor: 'bg-[#EBF2F0]',
      value: totalAnnouncements,
      label: 'TOTAL DES ANNONCES',
    },
    {
      icon: CircleDollarSign,
      color: 'text-white',
      bgColor: 'bg-[#347161]',
      value: userCredits,
      label: 'CRÉDITS',
    },
    {
      icon: CheckCircle2,
      color: 'text-[#374151]',
      bgColor: 'bg-[#EBF2F0]',
      value: pendingImprovements,
      label: 'AMÉLIORATIONS EN ATTENTE',
    },
    {
      icon: User,
      color: 'text-[#374151]',
      bgColor: 'bg-[#EBF2F0]',
      value: formatPlanName(userPlan),
      label: 'PLAN',
      isText: true,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {statItems.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <p className={`mb-1 font-[600] text-gray-800 ${stat.isText ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
                {stat.isText ? stat.value : String(stat.value).padStart(2, '0')}
              </p>
              <p className="text-base font-[500] text-gray-600 sm:text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStats;