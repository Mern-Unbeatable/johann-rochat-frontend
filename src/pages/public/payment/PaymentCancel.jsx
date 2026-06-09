import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md">
        <XCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement annulé</h1>
        <p className="text-gray-600 mb-6">
          Vous avez annulé le paiement. Vous pouvez réessayer quand vous voulez.
        </p>
        <button
          onClick={() => navigate('/creer-annonce')}
          className="px-6 py-3 bg-[#4A8B7D] text-white rounded-lg font-semibold hover:bg-[#3d7368] transition-all"
        >
          Retour à l'annonce
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;