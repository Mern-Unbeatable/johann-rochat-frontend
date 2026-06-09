// StepConfort.jsx
import React, { useCallback } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListingForm } from '../../../../features/listing/listingFormSlice';

const StepConfort = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.listingForm);

    const handleChange = useCallback((field, value) => {
        dispatch(updateListingForm({ [field]: value }));
    }, [dispatch]);

    const handleEquipmentToggle = useCallback((item) => {
        const currentEquipment = formData.equipment || [];
        let newEquipment;
        if (currentEquipment.includes(item)) {
            newEquipment = currentEquipment.filter(i => i !== item);
        } else {
            newEquipment = [...currentEquipment, item];
        }
        dispatch(updateListingForm({ equipment: newEquipment }));
    }, [dispatch, formData.equipment]);

    const equipmentOptions = ['Colonne de lavage', 'Cuisine équipée', 'Balcon', 'Cave', 'Jardin'];

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#334155]">Étape 3. Confort & Équipement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Condition <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Home size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                        <select
                            value={formData.condition || ''}
                            onChange={(e) => handleChange('condition', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-3 pl-10 appearance-none bg-white outline-none focus:border-[#3D7A6D]"
                        >
                            <option value="">Sélectionnez l'état de la propriété</option>
                            <option value="NEW">Neuf</option>
                            <option value="GOOD">Bon état</option>
                            <option value="RENOVATED">Rénové</option>
                            <option value="TO_RENOVATE">À rénover</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Exposition <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <select
                            value={formData.exposure || ''}
                            onChange={(e) => handleChange('exposure', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-3 pl-10 appearance-none bg-white outline-none focus:border-[#3D7A6D]"
                        >
                            <option value="">Sélectionnez l'exposition de la propriété</option>
                            <option value="NORTH">Nord</option>
                            <option value="SOUTH">Sud</option>
                            <option value="EAST">Est</option>
                            <option value="WEST">Ouest</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-base font-[500] text-gray-700 uppercase tracking-wider">Équipement et caractéristiques (en option)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {equipmentOptions.map((item) => (
                        <label key={item} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={(formData.equipment || []).includes(item)}
                                onChange={() => handleEquipmentToggle(item)}
                                className="w-4 h-4 rounded text-[#3D7A6D] focus:ring-[#3D7A6D]"
                            />
                            <span className="text-sm text-gray-600">{item}</span>
                        </label>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Autres équipements (séparés par des virgules)"
                    value={formData.customEquipment || ''}
                    onChange={(e) => handleChange('customEquipment', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 bg-white"
                />

                <p className="text-xs text-gray-400 italic">Exemple: Lave-vaisselle, Climatisation, Cheminée</p>
                <p className="text-sm text-gray-400 italic font-[400]">Cochez tout ce qui s'applique ou ajoutez le vôtre</p>
            </div>
            <p className='text-center text-[#6B7280] italic text-sm'>Pas besoin de tout remplir – Casagen s'adapte même avec des informations de base.</p>
        </div>
    );
};

export default StepConfort;