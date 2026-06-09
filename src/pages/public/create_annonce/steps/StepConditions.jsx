// StepConditions.jsx
import { ChevronDown } from 'lucide-react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListingForm } from '../../../../features/listing/listingFormSlice';

const StepConditions = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.listingForm);

  const handleChange = useCallback((field, value) => {
    dispatch(updateListingForm({ [field]: value }));
  }, [dispatch]);

  const handleAdditionalInfoChange = useCallback((e) => {
    dispatch(updateListingForm({ additionalInfo: e.target.value }));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#334155]">Étape 4. Conditions et proximité</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-base font-[500] tracking-wider text-gray-700 uppercase">
            Disponible à partir de (facultatif)
          </label>
          <input
            type="date"
            value={formData.availableFrom || ''}
            onChange={(e) => handleChange('availableFrom', e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-[#3D7A6D]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-[500] tracking-wider text-gray-700 uppercase">
            Animaux autorisés (facultatif)
          </label>
          <div className="relative">
            <select
              value={formData.petsAllowed === null ? '' : formData.petsAllowed ? 'true' : 'false'}
              onChange={(e) => {
                const val = e.target.value;
                handleChange('petsAllowed', val === '' ? null : val === 'true');
              }}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white p-3 pl-10 outline-none focus:border-[#3D7A6D]"
            >
              <option value="">Sélectionnez</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-600"
            />
          </div>
        </div>
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-base font-[500] tracking-wider text-gray-700 uppercase">
            Proximité (facultatif)
          </label>
          <input
            placeholder="p.ex supermarché à 3 min, pharmacie, centre ville, plage..."
            value={formData.proximity || ''}
            onChange={(e) => handleChange('proximity', e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-[#3D7A6D]"
          />
        </div>

      </div>
      <div className="text-left space-y-2 w-full ">
        <label className="text-base font-[500] text-gray-700 uppercase tracking-wider mb-2 block">Informations complémentaires (facultatif)</label>
        <textarea
          placeholder="Ecrivez quelques mots sur ce qui rend votre bien unique..."
          value={formData.additionalInfo || ''}
          onChange={handleAdditionalInfoChange}
          className="w-full border border-gray-200 rounded-2xl p-4 min-h-[150px] outline-none"
        />
      </div>
    </div>
  );
};

export default StepConditions;