// src/features/listing/listingFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Step 1: General
  location: '',
  propertyType: '',
  surface: null,
  rooms: null,
  floor: '',
  hasElevator: false,
  
  // Step 2: Finances
  rent: null,
  charges: null,
  parkingType: 'NONE',
  parkingPrice: null,
  
  // Step 3: Confort
  condition: '',
  exposure: '',
  equipment: [],
  customEquipment: '',
  
  // Step 4: Conditions
  availableFrom: '',
  petsAllowed: null,
  proximity: '',
  
  // Step 5: Medias
  photos: [], // Store only photo URLs after upload
  photosFiles: [], // Store File objects temporarily for upload
  additionalInfo: '',
  
  // Metadata
  currentStep: 1,
  isLoading: false,
  error: null,
  listingId: null,
};

const listingFormSlice = createSlice({
  name: 'listingForm',
  initialState,
  reducers: {
    updateListingForm: (state, action) => {
      Object.assign(state, action.payload);
    },
    setPhotos: (state, action) => {
      // Store only serializable data (URLs, not File objects)
      const photos = action.payload.map(photo => ({
        url: photo.url || (photo.preview || URL.createObjectURL(photo)),
        order: photo.order || 0,
        isPrimary: photo.isPrimary || false,
        file: photo instanceof File ? photo : photo.file, // Keep file separately if needed
      }));
      state.photos = photos;
    },
    setPhotosFiles: (state, action) => {
      state.photosFiles = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setListingId: (state, action) => {
      state.listingId = action.payload;
    },
    resetForm: () => initialState,
    loadListingData: (state, action) => {
      const listing = action.payload;
      state.location = listing.location || '';
      state.propertyType = listing.propertyType || '';
      state.surface = listing.surface || null;
      state.rooms = listing.rooms || null;
      state.floor = listing.floor || '';
      state.hasElevator = listing.hasElevator || false;
      state.rent = listing.rent || null;
      state.charges = listing.charges || null;
      state.parkingType = listing.parkingType || 'NONE';
      state.parkingPrice = listing.parkingPrice || null;
      state.condition = listing.condition || '';
      state.exposure = listing.exposure || '';
      state.equipment = listing.equipment ? listing.equipment.split(', ').filter(Boolean) : [];
      state.availableFrom = listing.availableFrom ? listing.availableFrom.split('T')[0] : '';
      state.petsAllowed = listing.petsAllowed;
      state.proximity = listing.proximity || '';
      state.photos = listing.photos || [];
      state.additionalInfo = listing.additionalInfo || '';
      state.listingId = listing.id;
    },
  },
});

export const {
  updateListingForm,
  setPhotos,
  setPhotosFiles,
  setCurrentStep,
  setLoading,
  setError,
  clearError,
  setListingId,
  resetForm,
  loadListingData,
} = listingFormSlice.actions;

export default listingFormSlice.reducer;