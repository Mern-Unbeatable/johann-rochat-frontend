/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useCreateImprovementRequestMutation } from '../../../features/api/improvementApi';
import toast from 'react-hot-toast';

const ExpertValidationCard = ({ listingId }) => {
  const [createRequest, { isLoading }] = useCreateImprovementRequestMutation();
  const user = useSelector((state) => state.auth.user);

  const handleValidationRequest = async () => {
    if (!user) {
      toast.error('Please login to request expert validation');
      return;
    }
    const loadingToast = toast.loading('Submitting validation request...');

    try {
      const result = await createRequest({
        listingId: listingId,
        userNote: "I would like professional advice on pricing and presentation"
      }).unwrap();
      toast.dismiss(loadingToast);
      toast.success(
        (t) => (
          <div>
            <p className="font-semibold"> {result.message}</p>
            <p className="text-sm text-gray-600 mt-1">
              Request ID: {result.data?.request?.id?.slice(0, 8)}...
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Our team will review your listing shortly
            </p>
          </div>
        ),
        { duration: 5000 }
      );
    
      
    } catch (error) {
      toast.dismiss(loadingToast);
    
      if (error?.data?.message?.includes('already have an active improvement request')) {
        toast.error('You already have an active validation request for this listing.', {
          duration: 4000,
        });
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error('Failed to submit validation request. Please try again.');
      }
    }
  };

  return (
    <div className="bg-[#4A8B7D] rounded-lg p-4 md:p-8 text-white space-y-6 shadow-xl shadow-[#4A8B7D]/10">
      <h4 className="text-xl font-extrabold tracking-tight text-white">
        Validation par un expert
      </h4>
      <p className="text-base text-gray-100 leading-[1.7] font-medium">
        Obtenez l'avis d'un professionnel de l'immobilier pour CHF 15.-. Votre annonce est analysée et vérifiée afin d'améliorer sa précision et sa crédibilité.
      </p>
      <button 
        onClick={handleValidationRequest}
        disabled={isLoading}
        className={`w-full py-4 bg-white text-[#4A8B7D] rounded-lg font-extrabold text-sm hover:bg-gray-50 transition-all shadow-md ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-[#4A8B7D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traitement...
          </span>
        ) : (
          'Demander la validation'
        )}
      </button>
    </div>
  );
};

export default ExpertValidationCard;