import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useGetAllPackagesQuery } from '../../../../features/api/packageApi';
import LoadingFallback from '../../../../router/components/LoadingFallback';

const CreditModal = ({ isOpen, onClose, member, onAddCredits, onAssignPackage, isLoading: parentLoading }) => {
    const { data: packagesData, isLoading: packageLoading } = useGetAllPackagesQuery({});
    const [creditAmount, setCreditAmount] = useState(1);
    const [selectedPackageId, setSelectedPackageId] = useState(member?.packageId || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('credits');

    const packages = packagesData?.packages || [];

    if (!isOpen) return null;
    if (packageLoading) {
        return <LoadingFallback />;
    }

    const handleIncrease = () => {
        setCreditAmount(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (creditAmount > 1) {
            setCreditAmount(prev => prev - 1);
        }
    };

    const handleSubmitCredits = async () => {
        setIsSubmitting(true);
        try {
            await onAddCredits(member.id, creditAmount);
            onClose();
        } catch (error) {
            console.error('Error adding credits:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAssignPackage = async () => {
        if (!selectedPackageId) {
            alert('Veuillez sélectionner un forfait');
            return;
        }
        setIsSubmitting(true);
        try {
            await onAssignPackage(member.id, selectedPackageId);
            onClose();
        } catch (error) {
            console.error('Error assigning package:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle package selection
    const handlePackageSelect = (packageId) => {
        console.log('Selecting package:', packageId);
        setSelectedPackageId(packageId);
    };

    const getCurrentPackage = () => {
        if (member?.packageId) {
            const currentPkg = packages.find(p => p.id === member.packageId);
            return currentPkg?.name || 'Aucun';
        }
        return 'Aucun';
    };

    const isLoading = isSubmitting || parentLoading;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
            {/* Modal Container - Responsive width and full height on mobile */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto flex flex-col max-h-[90vh] sm:max-h-[85vh]">

                {/* Sticky Header - Always visible */}
                <div className="sticky top-0 bg-white z-10 rounded-t-xl">
                    <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100">
                        <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-bold text-[#1A2B3B]">Gérer les crédits et forfaits</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                                {member?.name} - {member?.email}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs - Sticky */}
                    <div className="flex border-b border-gray-100 px-4 sm:px-6 bg-white">
                        <button
                            onClick={() => setActiveTab('credits')}
                            className={`py-2 sm:py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm transition-colors relative whitespace-nowrap ${activeTab === 'credits'
                                ? 'text-[#3A7D6C] border-b-2 border-[#3A7D6C]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Ajouter des crédits
                        </button>
                        <button
                            onClick={() => setActiveTab('package')}
                            className={`py-2 sm:py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm transition-colors relative whitespace-nowrap ${activeTab === 'package'
                                ? 'text-[#3A7D6C] border-b-2 border-[#3A7D6C]'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Assigner un forfait
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {activeTab === 'credits' ? (
                        <>
                            <div className="mb-6">
                                <label className="text-sm font-bold text-gray-700 mb-2 block">
                                    Nombre de crédits à ajouter
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleDecrease}
                                        disabled={creditAmount <= 1 || isLoading}
                                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Minus size={18} className="text-gray-600" />
                                    </button>
                                    <input
                                        type="number"
                                        value={creditAmount}
                                        onChange={(e) => setCreditAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                        disabled={isLoading}
                                        className="w-20 text-center border border-gray-200 rounded-lg px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-[#3A7D6C] disabled:bg-gray-100"
                                    />
                                    <button
                                        onClick={handleIncrease}
                                        disabled={isLoading}
                                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Plus size={18} className="text-gray-600" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    {creditAmount} crédit{creditAmount > 1 ? 's' : ''} seront ajoutés au compte
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Crédits actuels</span>
                                    <span className="text-lg font-bold text-[#3A7D6C]">{member?.credits || 0}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                                    <span className="text-sm font-semibold text-gray-800">Total après ajout</span>
                                    <span className="text-xl font-bold text-[#3A7D6C]">{(member?.credits || 0) + creditAmount}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="text-xs sm:text-sm font-bold text-gray-700 mb-2 block">
                                    Forfait actuel
                                </label>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Forfait: <span className="font-semibold text-gray-800">{getCurrentPackage()}</span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs sm:text-sm font-bold text-gray-700 mb-2 block">
                                    Sélectionner un nouveau forfait
                                </label>
                                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto pr-1">
                                    {packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => handlePackageSelect(pkg.id)}
                                            className={`flex items-center p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPackageId === pkg.id
                                                ? 'border-[#3A7D6C] bg-[#EBF2F0]'
                                                : 'border-gray-200 hover:border-gray-300'
                                                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                                {/* Radio button */}
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
                                                    {selectedPackageId === pkg.id && (
                                                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3A7D6C]"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div className="flex items-center flex-wrap gap-2">
                                                            <span className="font-bold text-sm sm:text-base text-gray-800">
                                                                {pkg.name}
                                                            </span>
                                                            {pkg.badge && (
                                                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                                                    Populaire
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-base sm:text-lg font-bold text-[#3A7D6C]">
                                                            {pkg.price} CHF
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                                        <span className="text-xs sm:text-sm text-gray-500">
                                                            {pkg.credits} crédits
                                                        </span>
                                                        <span className="text-xs sm:text-sm text-gray-400">
                                                            {pkg.pricePerCredit} CHF/crédit
                                                        </span>
                                                    </div>
                                                    {pkg.description && (
                                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                            {pkg.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedPackageId && (
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-gray-600">Crédits du forfait</span>
                                        <span className="text-base sm:text-lg font-bold text-[#3A7D6C]">
                                            {packages.find(p => p.id === selectedPackageId)?.credits || 0} crédits
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                                        <span className="text-xs sm:text-sm text-gray-600">Prix</span>
                                        <span className="text-base sm:text-lg font-bold text-[#3A7D6C]">
                                            {packages.find(p => p.id === selectedPackageId)?.price || 0} CHF
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Sticky Footer - Always visible */}
                <div className="sticky bottom-0 bg-white z-10 rounded-b-xl">
                    <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={activeTab === 'credits' ? handleSubmitCredits : handleAssignPackage}
                            disabled={isLoading || (activeTab === 'package' && !selectedPackageId)}
                            className="flex-1 px-3 sm:px-4 py-2 bg-[#3A7D6C] text-white rounded-lg font-semibold text-xs sm:text-sm hover:bg-[#2d5a4e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? (activeTab === 'credits' ? 'Ajout en cours...' : 'Assignation en cours...')
                                : (activeTab === 'credits' ? 'Ajouter les crédits' : 'Assigner le forfait')
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditModal;