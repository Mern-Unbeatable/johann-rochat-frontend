import React, { useState } from 'react';
import ModifyPlanModal from './ModifyPlanModal';
import AdminPriceCard from './AdminPriceCard';
import PricingSkeleton from './PricingSkeleton';
import { useGetAllPackagesQuery } from '../../../../features/api/packageApi';
import { transformPackageToCardFormat } from '../../../../utils/packageUtils';

const AdminPricingCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const { data, isLoading, refetch } = useGetAllPackagesQuery({});

    if (isLoading) {
        return <PricingSkeleton />;
    }

    const packages = data?.packages || [];
    const transformedPackages = packages.map(transformPackageToCardFormat);

    const handleEditClick = (packageId) => {
        setSelectedPackageId(packageId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPackageId(null);
        refetch();
    };

    return (
        <div className="py-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-6 md:grid-cols-3 items-stretch">
                    {transformedPackages.map((pack, index) => (
                        <AdminPriceCard
                            key={pack.id || index}
                            {...pack}
                            onEditClick={() => handleEditClick(pack.id)}
                        />
                    ))}
                </div>
            </div>

            <ModifyPlanModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                packageId={selectedPackageId}
                isAddingNew={false}
            />
        </div>
    );
};

export default AdminPricingCards;