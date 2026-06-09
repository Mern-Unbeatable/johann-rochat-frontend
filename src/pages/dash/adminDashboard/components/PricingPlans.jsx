import React, { useState } from 'react';
import AdminPricingCards from './AdminPricingCards';
import ModifyPlanModal from './ModifyPlanModal';
import { useGetAllPackagesQuery } from '../../../../features/api/packageApi';

const PricingPlans = () => {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAllPackagesQuery({})
  const handleModalClose = () => {
    setIsAddPlanModalOpen(false);
    refetch();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-[600] text-gray-800 sm:text-3xl">Tarifs et forfaits</h2>
        <button
          onClick={() => setIsAddPlanModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:text-base"
        >
          <span>+</span> Ajouter un forfait
        </button>
      </div>

      <div className="mb-4">
        <AdminPricingCards />
      </div>

      <ModifyPlanModal
        isOpen={isAddPlanModalOpen}
        onClose={handleModalClose}
        isAddingNew={true}
      />
    </div>
  );
};

export default PricingPlans;