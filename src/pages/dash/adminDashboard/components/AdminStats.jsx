import React from 'react';
import { Users, CreditCard, Zap } from 'lucide-react';
import { useGetSimpleStatsQuery } from '../../../../features/api/metaApi';
import LoadingFallback from '../../../../router/components/LoadingFallback';
import ErrorElement from '../../../../router/components/ErrorElement';

const AdminStats = () => {
  const { data: simpleStats, isLoading, error } = useGetSimpleStatsQuery({});

  if (isLoading) {
    return <LoadingFallback />
  }

  if (error) {
    return <ErrorElement />
  }


  const pipelineCharge = simpleStats?.totalRevenue || 0;

  const statItems = [
    {
      icon: Users,
      color: 'text-[#374151]',
      bgColor: 'bg-[#EBF2F0]',
      value: simpleStats?.totalMembers - 1 || 0,
      label: 'TOTAL DES MEMBRES',
    },
    {
      icon: CreditCard,
      color: 'text-white',
      bgColor: 'bg-[#347161]',
      value: simpleStats?.payingUsers || 0,
      label: 'UTILISATEURS PAYANTS',
    },
    {
      icon: Zap,
      color: 'text-[#374151]',
      bgColor: 'bg-[#EBF2F0]',
      value: pipelineCharge,
      label: 'CHARGE DES PIPELINES (CHF)',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {statItems.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-4">
              <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <p className="mb-1 text-2xl font-[600] text-gray-800 sm:text-3xl">
                {typeof stat.value === 'number' ? stat.value.toLocaleString('fr-FR') : stat.value}
              </p>
              <p className="md:text-base font-[500] text-[#6B7280] text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminStats;