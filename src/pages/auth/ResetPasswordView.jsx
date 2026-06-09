import { ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '../../features/api/authApi';
import toast from 'react-hot-toast';

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!email) {
      toast.error('Please verify your email first');
      navigate('/auth/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.newPassword) {
      errors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isFormValid = 
    formData.newPassword.length >= 6 && 
    formData.newPassword === formData.confirmPassword &&
    formData.confirmPassword !== '';

const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    const firstError = Object.values(errors)[0];
    toast.error(firstError);
    return;
  }

  try {
    const result = await resetPassword({ 
      email, 
      newPassword: formData.newPassword, 
      confirmPassword: formData.confirmPassword 
    }).unwrap();
    
    toast.success('Password reset successfully!');
    

    navigate('/auth/login', { 
      replace: true,
      state: { message: 'Password reset successful! Please login.' }
    });
    
  } catch (err) {
    const errorMessage = err?.data?.message || err?.message || 'Failed to reset password.';
    toast.error(errorMessage);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[20px] shadow-sm border border-gray-100 p-4 md:p-6">
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={18} /> Retour
        </button>

        <h1 className="text-3xl font-bold text-[#334155] mb-2">Définir un nouveau mot de passe</h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Votre demande de réinitialisation a été validée. Veuillez définir un nouveau mot de passe sécurisé pour votre compte.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={handleChange('newPassword')}
                disabled={isLoading}
                placeholder="Minimum 6 characters"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#2D5A4E] transition-all ${
                  validationErrors.newPassword ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D5A4E] transition-colors disabled:cursor-not-allowed"
              >
                {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {validationErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                disabled={isLoading}
                placeholder="Re-enter your password"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#2D5A4E] transition-all ${
                  validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D5A4E] transition-colors disabled:cursor-not-allowed"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full mt-6 py-3.5 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 ${
              isFormValid && !isLoading
                ? 'bg-[#2D5A4E] text-white hover:bg-[#23473D] shadow-md' 
                : 'bg-[#E5E7EB] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mise à jour en cours...
              </>
            ) : (
              'Définir le mot de passe'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Vous vous souvenez de votre mot de passe ?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-[#2D5A4E] font-bold hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordView;