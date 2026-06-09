// StepGeneral.jsx
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListingForm } from '../../../../features/listing/listingFormSlice';

const StepGeneral = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.listingForm);
    const hasElevator = formData.hasElevator || false;
    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        let error = '';
        if (field === 'surface') {
            if (!value || value <= 0) {
                error = 'La surface est requise et doit être supérieure à 0';
            }
        } else if (field === 'rooms') {
            if (!value && value !== 0) {
                error = 'Le nombre de pièces est requis';
            }
        }
        return error;
    };

    const handleChange = useCallback((field, value) => {
        // Special handling for rooms - allow decimals
        if (field === 'rooms') {
            if (value === '') {
                dispatch(updateListingForm({ [field]: null }));
                setErrors(prev => ({ ...prev, [field]: validateField(field, null) }));
                return;
            }
            // Parse as float to allow decimals
            const floatValue = parseFloat(value);
            if (!isNaN(floatValue)) {
                dispatch(updateListingForm({ [field]: floatValue }));
                setErrors(prev => ({ ...prev, [field]: validateField(field, floatValue) }));
            }
        } else {
            dispatch(updateListingForm({ [field]: value }));
            if (field === 'surface') {
                setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
            }
        }
    }, [dispatch]);

    const handleSurfaceChange = useCallback((e) => {
        const value = e.target.value;
        const floatValue = value ? parseFloat(value) : null;
        handleChange('surface', floatValue);
    }, [handleChange]);

    const handleRoomsChange = useCallback((e) => {
        const value = e.target.value;
        handleChange('rooms', value);
    }, [handleChange]);

    const toggleElevator = useCallback(() => {
        dispatch(updateListingForm({ hasElevator: !hasElevator }));
    }, [dispatch, hasElevator]);

    const handleBlur = useCallback((field) => {
        if (field === 'surface') {
            setErrors(prev => ({ ...prev, [field]: validateField(field, formData.surface) }));
        } else if (field === 'rooms') {
            setErrors(prev => ({ ...prev, [field]: validateField(field, formData.rooms) }));
        }
    }, [formData.surface, formData.rooms]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#334155]">Étape 1. Général et emplacement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Emplacement <span className="text-red-500">*</span></label>
                    <input
                        placeholder="Entrez la ville ou le quartier"
                        value={formData.location || ''}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D]"
                    />
                    <p className="text-sm text-gray-400">e.g. Lausanne, centre ville</p>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Type de propriété <span className="text-red-500">*</span> </label>
                    <select
                        value={formData.propertyType || ''}
                        onChange={(e) => handleChange('propertyType', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D] appearance-none bg-white"
                    >
                        <option value="">Sélectionnez le type</option>
                        <option value="APARTMENT">Appartement</option>
                        <option value="HOUSE">Maison</option>
                        <option value="COMMERCIAL">Commercial</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">
                        Surface  <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            placeholder="Surface en m²"
                            value={formData.surface || ''}
                            onChange={handleSurfaceChange}
                            onBlur={() => handleBlur('surface')}
                            className={`w-full border rounded-lg p-3 pr-10 outline-none focus:border-[#3D7A6D] ${errors.surface ? 'border-red-500' : 'border-gray-200'
                                }`}
                        />
                        <span className="absolute right-3 top-3 text-gray-400">M2</span>
                    </div>

                </div>
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">
                        Nombre de pièces <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="any"
                        placeholder="Entrez le nombre de pièces"
                        value={formData.rooms || ''}
                        onChange={handleRoomsChange}
                        onBlur={() => handleBlur('rooms')}
                        className={`w-full border rounded-lg p-3 outline-none focus:border-[#3D7A6D] ${errors.rooms ? 'border-red-500' : 'border-gray-200'
                            }`}
                    />

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Étage (facultatif)</label>
                    <input
                        placeholder="e.g. 1er étage, rez-de-chaussée"
                        value={formData.floor || ''}
                        onChange={(e) => handleChange('floor', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3D7A6D]"
                    />
                    <p className="text-sm text-gray-400">e.g. 1er étage, rez-de-chaussée</p>
                </div>

                <div className="space-y-2 flex items-center md:items-start">
                    <div>
                        <label className="text-sm font-[500] text-gray-700 uppercase tracking-wider block mb-2">Ascenseur (en option)</label>
                        <button
                            type="button"
                            onClick={toggleElevator}
                            className={`flex items-center w-14 h-8 rounded-full px-1 transition-colors ${hasElevator ? 'bg-[#3D7A6D]' : 'bg-gray-200'}`}
                        >
                            <span className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${hasElevator ? 'translate-x-6' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 text-center">Les champs marqués d'un * sont requis. Pas besoin de tout remplir — Casagen s'adapte même avec des informations de base.</p>
        </div>
    );
};

export default StepGeneral;