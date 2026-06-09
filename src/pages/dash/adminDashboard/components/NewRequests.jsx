import React, { useState, useEffect } from 'react';
import { Check, Search, Loader2, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAllPaymentsQuery } from '@/features/api/paymentApi';
import { formatStatus } from '../../../../utils/payment';
import LoadingFallback from '../../../../router/components/LoadingFallback';
import PaymentDetailModal from './PaymentDetailModal';

const NewRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (debouncedSearch) {
    queryParams.search = debouncedSearch;
  }
  if (statusFilter) {
    queryParams.status = statusFilter;
  }

  const { data: paymentData, isLoading, error, refetch } = useGetAllPaymentsQuery(queryParams);

  const payments = paymentData?.payments || [];
  const meta = paymentData?.meta || {
    page: 1,
    limit: itemsPerPage,
    total: 0,
    totalPage: 0
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
      // Remove the scroll to top to prevent jumping
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    if (status === 'PENDING' || status === 'EN ATTENTE') {
      return 'bg-[#EBF2F0] text-[#6B7280]';
    } else if (status === 'SUCCESS' || status === 'PAYÉ') {
      return 'bg-[#EBF2F0] border border-[#3A7D6C] text-[#3A7D6C]';
    } else if (status === 'FAILED') {
      return 'bg-red-50 border border-red-200 text-red-600';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getPackageBadge = (pack) => {
    if (pack === 'Mini-Pack' || pack === 'Essentiel') {
      return 'text-[#3A7D6C] bg-[#EBF2F0] border border-[#3A7D6C]';
    } else if (pack === 'Pack Standard' || pack === 'Individuel') {
      return 'bg-[#EBF2F0] text-[#6B7280]';
    } else if (pack === 'Pack Pro' || pack === 'Prime') {
      return 'bg-[#EBF2F0] text-[#6B7280]';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getPackageName = (payment) => {
    if (payment.package?.name) {
      return payment.package.name;
    }
    if (payment.packageName) {
      return payment.packageName;
    }
    if (payment.type === 'LISTING_UNLOCK') {
      return 'Déblocage';
    }
    if (payment.type === 'AI_FEATURE') {
      return 'Fonctionnalité IA';
    }
    return 'N/A';
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = meta.totalPage;
    const current = meta.page;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (current >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = current - 1; i <= current + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  if (isLoading) {
    return <LoadingFallback />
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="text-center py-12">
            <p className="text-red-500">Erreur lors du chargement des données</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-[#3A7D6C] text-white rounded-lg"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-xl">
                Historique des paiements
              </h2>
              <p className="mt-1 text-base text-gray-500">
                {meta.total} paiement(s) effectué(s)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Items Per Page Selector */}
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="rounded-lg border-2 border-gray-200 py-2.5 px-4 text-sm focus:outline-none focus:border-[#3A7D6C] bg-white"
              >
                <option value={6}>6 par page</option>
                <option value={10}>10 par page</option>
                <option value={20}>20 par page</option>
                <option value={50}>50 par page</option>
              </select>

              {/* Status Filter Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border-2 border-gray-200 py-2.5 px-4 text-sm focus:outline-none focus:border-[#3A7D6C] bg-white"
              >
                <option value="">Tous les statuts</option>
                <option value="SUCCESS">Payé</option>
                <option value="PENDING">En attente</option>
                <option value="FAILED">Échoué</option>
              </select>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email, forfait..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:border-primary w-full rounded-lg border-2 border-gray-200 py-2.5 pr-4 pl-10 text-sm placeholder-gray-400 transition-colors focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || statusFilter) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || statusFilter) && (
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-2">
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md text-sm border border-gray-200">
                  Statut: {statusFilter === 'SUCCESS' ? 'Payé' : statusFilter === 'PENDING' ? 'En attente' : statusFilter}
                  <button onClick={() => setStatusFilter('')} className="ml-1 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md text-sm border border-gray-200">
                  Recherche: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun paiement trouvé</p>
              {(searchTerm || statusFilter) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#3A7D6C] hover:underline"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Mobile + Tablet Cards */}
              <div className="space-y-3 p-3 lg:hidden">
                {payments.map((payment) => {
                  const userName = payment.user?.name || 'N/A';
                  const userEmail = payment.user?.email || 'N/A';
                  const packageName = getPackageName(payment);
                  const paymentStatus = formatStatus(payment.status);

                  return (
                    <div key={payment.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800">{userName}</p>
                          <p className="truncate text-xs text-gray-500">{userEmail}</p>
                        </div>
                        <span
                          className={`inline-block shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-semibold ${getStatusBadge(
                            paymentStatus
                          )}`}
                        >
                          {paymentStatus}
                        </span>
                      </div>

                      <div className="mb-4 rounded-md bg-gray-50 px-3 py-2">
                        <p className="mb-1 text-sm text-gray-500">Forfait / Service</p>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getPackageBadge(
                            packageName
                          )}`}
                        >
                          {packageName}
                        </span>
                        <p className="mt-2 text-xs text-gray-500">
                          {payment.credits || 0} crédits · {payment.amount || 0} CHF
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(payment.createdAt).toLocaleDateString('fr-CH')}
                        </p>
                      </div>

                      <button
                        onClick={() => handleViewDetails(payment)}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#4A8B7D] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3d7368]"
                      >
                        <Eye size={16} />
                        <span>Détails</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-100 bg-[#F8FBFE]">
                    <tr>
                      <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                        Entité Suisse
                      </th>
                      <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                        Statut
                      </th>
                      <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                        Forfait
                      </th>
                      <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payments.map((payment) => {
                      const userName = payment.user?.name || 'N/A';
                      const userEmail = payment.user?.email || 'N/A';
                      const packageName = getPackageName(payment);
                      const paymentStatus = formatStatus(payment.status);

                      return (
                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 sm:px-6">
                            <div>
                              <p className="font-medium text-gray-800 text-sm sm:text-base">
                                {userName}
                              </p>
                              <p className="text-sm text-gray-500">{userEmail}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {payment.credits || 0} crédits · {payment.amount || 0} CHF
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(
                                paymentStatus
                              )}`}
                            >
                              {paymentStatus}
                            </span>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getPackageBadge(
                                packageName
                              )}`}
                            >
                              {packageName}
                            </span>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <button
                              onClick={() => handleViewDetails(payment)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#4A8B7D] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#3d7368]"
                            >
                              <Eye size={16} />
                              <span>Détails</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {meta.totalPage > 1 && (
                <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Affichage de {(meta.page - 1) * meta.limit + 1} à {Math.min(meta.page * meta.limit, meta.total)} sur {meta.total} résultats
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(meta.page - 1)}
                        disabled={meta.page === 1}
                        className={`p-2 rounded-lg border transition-colors ${meta.page === 1
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-[#3A7D6C]'
                          }`}
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <div className="flex gap-1">
                        {getPageNumbers().map((pageNum, idx) => (
                          <button
                            key={idx}
                            onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                            className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${pageNum === meta.page
                                ? 'bg-[#3A7D6C] text-white'
                                : pageNum === '...'
                                  ? 'text-gray-400 cursor-default'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#3A7D6C]'
                              }`}
                            disabled={pageNum === '...'}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(meta.page + 1)}
                        disabled={meta.page === meta.totalPage}
                        className={`p-2 rounded-lg border transition-colors ${meta.page === meta.totalPage
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-[#3A7D6C]'
                          }`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Payment Detail Modal */}
      <PaymentDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
      />
    </>
  );
};

export default NewRequests;