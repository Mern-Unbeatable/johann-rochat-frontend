// src/pages/payment/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      toast.success('Paiement réussi! Votre annonce est débloquée.');
      setTimeout(() => {
        navigate('/dash');
      }, 3000);
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement réussi!</h1>
        <p className="text-gray-600 mb-6">
          Votre annonce a été débloquée avec succès. Vous serez redirigé vers votre tableau de bord.
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A8B7D] mx-auto"></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;