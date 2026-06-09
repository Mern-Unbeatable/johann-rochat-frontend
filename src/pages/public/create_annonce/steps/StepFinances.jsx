// StepFinances.jsx
import React, { useCallback } from 'react';
import { ParkingCircle, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListingForm } from '../../../../features/listing/listingFormSlice';

const StepFinances = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.listingForm);

    const handleChange = useCallback((field, value) => {
        dispatch(updateListingForm({ [field]: value }));
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#334155]">Étape 2. Loyer et prix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Loyer Net (CHF) <span className="text-red-500">*</span></label>
                    <input
                        placeholder="CHF"
                        value={formData.rent || ''}
                        onChange={(e) => handleChange('rent', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D]"
                    />
                </div>

                <div>
                    <div className="space-y-2">
                        <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Charge</label>
                        <input
                            placeholder="CHF"
                            value={formData.charges || ''}
                            onChange={(e) => handleChange('charges', e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 tracking-wider"><span className='uppercase'>Parking</span> (facultatif)</label>
                    <div className="relative">
                        <ParkingCircle size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <select
                            value={formData.parkingType || 'NONE'}
                            onChange={(e) => handleChange('parkingType', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-3 pl-10 outline-none focus:border-[#3D7A6D] appearance-none bg-white"
                        >
                            <option value="NONE">Aucun</option>
                            <option value="OUTDOOR">Extérieur</option>
                            <option value="GARAGE">Garage</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Prix parking</label>
                    <input
                        placeholder="CHF"
                        value={formData.parkingPrice || ''}
                        onChange={(e) => handleChange('parkingPrice', e.target.value ? parseFloat(e.target.value) : null)}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D]"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepFinances;