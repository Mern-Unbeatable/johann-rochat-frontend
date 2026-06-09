import React from 'react';
import { X, CheckCircle, Clock, AlertCircle, Package, CreditCard, Calendar, User, Mail, Hash, DollarSign } from 'lucide-react';
import { formatDate } from '../../../../utils/formatDate';

const PaymentDetailModal = ({ isOpen, onClose, payment }) => {
    if (!isOpen || !payment) return null;

    const getStatusIcon = (status) => {
        if (status === 'SUCCESS' || status === 'PAYÉ') {
            return <CheckCircle size={20} className="text-green-500" />;
        } else if (status === 'PENDING' || status === 'EN ATTENTE') {
            return <Clock size={20} className="text-yellow-500" />;
        } else if (status === 'FAILED') {
            return <AlertCircle size={20} className="text-red-500" />;
        }
        return null;
    };

    const getStatusColor = (status) => {
        if (status === 'SUCCESS' || status === 'PAYÉ') {
            return 'bg-green-100 text-green-800 border-green-200';
        } else if (status === 'PENDING' || status === 'EN ATTENTE') {
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        } else if (status === 'FAILED') {
            return 'bg-red-100 text-red-800 border-red-200';
        }
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };



    const getPaymentTypeLabel = (type) => {
        const types = {
            'PACKAGE': 'Forfait',
            'LISTING_UNLOCK': 'Déblocage d\'annonce',
            'AI_FEATURE': 'Fonctionnalité IA',
            'IMPROVEMENT_REQUEST': 'Demande d\'amélioration',
        };
        return types[type] || type;
    };

    const paymentStatus = payment.status === 'SUCCESS' ? 'PAYÉ' : payment.status === 'PENDING' ? 'EN ATTENTE' : payment.status;
    const userName = payment.user?.name || 'N/A';
    const userEmail = payment.user?.email || 'N/A';
    const packageName = payment.package?.name || payment.packageName || 'N/A';

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg- bg-opacity-90 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-800">Détails du paiement</h3>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(paymentStatus)}`}>
                                {getStatusIcon(paymentStatus)}
                                {paymentStatus}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* User Information */}
                        <div className="bg-gradient-to-r from-[#F8F3E8] to-white rounded-xl p-5">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Informations client
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <User size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Nom</p>
                                        <p className="font-medium text-gray-800">{userName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Mail size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-800">{userEmail}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Hash size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">ID Utilisateur</p>
                                        <p className="font-mono text-xs text-gray-600">{payment.userId?.slice(0, 8)}...</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Calendar size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Date d'inscription</p>
                                        <p className="font-medium text-gray-800">
                                            {payment.user?.createdAt ? formatDate(payment.user.createdAt) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Informations de paiement
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CreditCard size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">ID Paiement</p>
                                        <p className="font-mono text-xs text-gray-600">{payment.id?.slice(0, 12)}...</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <DollarSign size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Montant</p>
                                        <p className="font-bold text-xl text-gray-800">{payment.amount} CHF</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Package size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Type</p>
                                        <p className="font-medium text-gray-800">{getPaymentTypeLabel(payment.type)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Package size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Forfait / Service</p>
                                        <p className="font-medium text-gray-800">{packageName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <CreditCard size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Crédits</p>
                                        <p className="font-medium text-gray-800">{payment.credits || 0} crédits</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-full shadow-sm">
                                        <Calendar size={18} className="text-[#4A8B7D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Date du paiement</p>
                                        <p className="font-medium text-gray-800">{formatDate(payment.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stripe Information (if available) */}
                        {(payment.stripeSessionId || payment.stripePaymentIntentId) && (
                            <div className="bg-gray-50 rounded-xl p-5">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    Informations Stripe
                                </h4>
                                <div className="space-y-3">
                                    {payment.stripeSessionId && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Session ID</p>
                                            <p className="font-mono text-xs bg-white p-2 rounded border border-gray-200 break-all">
                                                {payment.stripeSessionId}
                                            </p>
                                        </div>
                                    )}
                                    {payment.stripePaymentIntentId && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Payment Intent ID</p>
                                            <p className="font-mono text-xs bg-white p-2 rounded border border-gray-200 break-all">
                                                {payment.stripePaymentIntentId}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Package Details (if package exists) */}
                        {payment.package && (
                            <div className="bg-gradient-to-r from-[#4A8B7D] to-[#3d7368] rounded-xl p-5 ">
                                <h4 className="text-sm font-semibold text-white opacity-90 uppercase tracking-wider mb-3">
                                    Détails du forfait
                                </h4>
                                <div className="grid grid-cols-2 gap-4 ">
                                    <div>
                                        <p className="text-xs opacity-75 text-white">Nom du forfait</p>
                                        <p className="font-bold text-lg text-white">{payment.package.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs opacity-75 text-white">Crédits inclus</p>
                                        <p className="font-bold text-lg text-white">{payment.package.credits} crédits</p>
                                    </div>
                                    <div>
                                        <p className="text-xs opacity-75 text-white">Prix</p>
                                        <p className="font-bold text-lg text-white">{payment.package.price} CHF</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2.5 bg-[#4A8B7D] text-white rounded-lg font-semibold hover:bg-[#3d7368] transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentDetailModal;