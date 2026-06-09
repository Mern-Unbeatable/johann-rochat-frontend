// VerifyOtpView.jsx - For SIGNUP verification
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useVerifySignupOtpMutation, useResendOtpMutation } from '../../features/api/authApi';
import toast from 'react-hot-toast';

const VerifyOtpView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const isPasswordReset = location.state?.isPasswordReset || false;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(60);
  const canResend = timer === 0;

  // RTK Query hooks
  const [verifySignupOtp, { isLoading: isVerifying }] = useVerifySignupOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (!email) {
      toast.error('Please provide your email first');
      navigate('/auth/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return undefined;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await resendOtp({ email, purpose: 'signup' }).unwrap();

      if (result) {
        setSuccess('A new verification code has been sent to your email!');
        setTimer(60);
        toast.success('New verification code sent!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      const errorMessage = err?.data?.message || 'Failed to resend code. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    try {
      const result = await verifySignupOtp({ email, otp }).unwrap();


      if (result) {
        setSuccess('Email verified successfully!');
        toast.success('Email verified successfully!');

        // Navigate to dashboard after signup success
        setTimeout(() => {
          navigate('/dash', {
            state: {
              message: 'Account verified successfully! Welcome to your dashboard.'
            }
          });
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err?.data?.message || 'Invalid verification code. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      setOtp('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[20px] shadow-sm border border-gray-100 p-4 md:p-6">

        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-black transition-colors">
          <ArrowLeft size={18} /> Retour
        </button>

        <h1 className="text-3xl font-bold text-[#334155] mb-2">Confirmation</h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Nous avons envoyé un code de confirmation à <span className="text-black font-semibold">{email}</span>.
        </p>

        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4A4A4A] mb-3">Entrez votre code</label>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              disabled={isVerifying || isResending}
              placeholder="0 0 0 0 0 0"
              className="w-full text-center text-2xl tracking-[0.5em] font-bold rounded-lg border border-gray-200 px-4 py-4 outline-none focus:border-[#2D5A4E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              autoFocus
            />
          </div>

          <div className="text-center mb-8">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend || isVerifying || isResending}
              className={`text-sm font-bold transition-colors ${canResend && !isVerifying && !isResending
                  ? 'text-[#2D5A4E] hover:underline cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
                }`}
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#2D5A4E] border-t-transparent rounded-full animate-spin"></div>
                  Envoi en cours...
                </span>
              ) : canResend ? (
                'Renvoyer le code'
              ) : (
                `Renvoyer dans ${timer}s`
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6 || isVerifying || isResending}
            className={`w-full py-3.5 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 ${otp.length === 6 && !isVerifying && !isResending
                ? 'bg-[#2D5A4E] text-white hover:bg-[#23473D] shadow-md'
                : 'bg-[#E5E7EB] text-gray-400 cursor-not-allowed'
              }`}
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Vérification en cours...
              </>
            ) : (
              'Vérifier le compte'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Le code expire dans 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpView;