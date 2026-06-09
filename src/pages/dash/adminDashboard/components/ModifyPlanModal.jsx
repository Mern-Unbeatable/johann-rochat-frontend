import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useGetPackageByIdQuery, useUpdatePackageMutation, useCreatePackageMutation } from '../../../../features/api/packageApi';
import toast from 'react-hot-toast';

const ModifyPlanModal = ({ isOpen, onClose, packageId, isAddingNew = false }) => {
  const { data: packageData, isLoading: isLoadingPackage } = useGetPackageByIdQuery(packageId, {
    skip: !packageId || isAddingNew
  });

  const [updatePackage, { isLoading: isUpdating }] = useUpdatePackageMutation();
  const [createPackage, { isLoading: isCreating }] = useCreatePackageMutation();

  const [formData, setFormData] = useState({
    name: '',
    isPopular: false,
    credits: '',
    price: '',
    pricePerCredit: '',
    description: '',
    features: []
  });
  const [newFeature, setNewFeature] = useState('');


  useEffect(() => {
    if (packageData && !isAddingNew) {
      const pkg = packageData.package || packageData;
      setFormData({
        name: pkg.name || '',
        isPopular: pkg.badge === true,
        credits: pkg.credits?.toString() || '',
        price: pkg.price?.toString() || '',
        pricePerCredit: pkg.pricePerCredit?.toString() || '',
        description: pkg.description || '',
        features: pkg.features || []
      });
    } else if (isAddingNew) {
      setFormData({
        name: '',
        isPopular: false,
        credits: '',
        price: '',
        pricePerCredit: '',
        description: '',
        features: []
      });
    }
  }, [packageData, isAddingNew]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      const packagePayload = {
        name: formData.name,
        credits: parseInt(formData.credits),
        price: parseFloat(formData.price),
        pricePerCredit: parseFloat(formData.pricePerCredit) || (parseFloat(formData.price) / parseInt(formData.credits)),
        description: formData.description,
        features: formData.features,
        badge: formData.isPopular
      };

      if (isAddingNew) {
        await createPackage(packagePayload).unwrap();
        toast.success('Forfait créé avec succès !');
      } else {
        await updatePackage({ id: packageId, ...packagePayload }).unwrap();
        toast.success('Forfait mis à jour avec succès !');
      }
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || 'Une erreur est survenue');
    }
  };

  const isLoading = isLoadingPackage || isUpdating || isCreating;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[640px] flex flex-col max-h-[90vh]">

        {/* STICKY HEADER */}
        <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-100 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-[#1A2B3B]">
                {isAddingNew ? 'Ajouter un forfait' : `Modifier le plan : ${formData.name || '...'}`}
              </h2>
              <p className="text-base text-gray-400 mt-0.5">
                {isAddingNew ? 'Créer un nouveau forfait avec tarifs et fonctionnalités.' : 'Configurer les tarifs et les limitations des fonctionnalités.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto p-8 space-y-5 custom-scrollbar">
          {isLoadingPackage && !isAddingNew ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={32} className="animate-spin text-[#3E7D6E]" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-base font-bold text-[#1A2B3B]">Nom du régime</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E] mt-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-bold text-[#1A2B3B]">Insigne populaire</label>
                  <div className="relative">
                    <select
                      value={formData.isPopular ? "Oui" : "Non"}
                      onChange={(e) => handleInputChange('isPopular', e.target.value === "Oui")}
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 appearance-none focus:outline-none mt-2"
                    >
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-base font-bold text-[#1A2B3B]">Crédits</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) => handleInputChange('credits', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E] mt-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-bold text-[#1A2B3B]">Prix (CHF)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E] mt-2"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-base font-bold text-[#1A2B3B]">Prix par crédit (CHF)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerCredit}
                  onChange={(e) => handleInputChange('pricePerCredit', e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E] mt-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-bold text-[#1A2B3B]">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E] mt-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-bold text-[#1A2B3B]">Caractéristiques</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="bg-[#EBF1EF] rounded-md px-4 py-2.5 text-base text-gray-600 font-medium flex justify-between items-center mt-2">
                      <span>{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-2 text-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>


                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Ajouter une nouvelle fonctionnalité"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3E7D6E]"
                  />
                  <button
                    onClick={handleAddFeature}
                    className="bg-[#EBF1EF] text-[#3E7D6E] px-4 rounded-lg font-bold text-lg hover:bg-[#dfe9e6]"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white px-8 py-6 border-t border-gray-100 rounded-b-xl flex gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-2.5 border border-gray-600 text-gray-600 rounded-md font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-6 py-2.5 bg-[#3E7D6E] text-white rounded-md font-semibold text-sm hover:bg-[#346a5d] shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading
              ? (isAddingNew ? 'Création...' : 'Enregistrement...')
              : (isAddingNew ? 'Créer le forfait' : 'Enregistrer les modifications')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyPlanModal;