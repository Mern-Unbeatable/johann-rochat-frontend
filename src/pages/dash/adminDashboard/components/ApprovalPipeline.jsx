import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetAllImprovementRequestsQuery, useUpdateImprovementStatusMutation } from '../../../../features/api/improvementApi';
import LoadingFallback from '../../../../router/components/LoadingFallback';
import toast from 'react-hot-toast';

const ApprovalPipeline = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Debounce search - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (debouncedSearch) {
    queryParams.search = debouncedSearch;
  }

  const { data: improvementsData, isLoading, refetch } = useGetAllImprovementRequestsQuery(queryParams);
  const [updateImprovementStatus] = useUpdateImprovementStatusMutation();

  if (isLoading) return <LoadingFallback />

  const improvements = improvementsData?.requests || [];
  const meta = improvementsData?.meta || {
    page: 1,
    limit: itemsPerPage,
    total: 0,
    totalPage: 0
  };

  // Map improvements to the format needed for the table
  const approvals = improvements.map(improvement => ({
    id: improvement.id,
    property: improvement.listing?.listingName || `Property ${improvement.listing?.propertyType || 'N/A'}`,
    email: improvement.user?.email || 'N/A',
    userId: improvement.user?.name || 'N/A',
    status: improvement.status === 'PENDING' ? 'EN ATTENTE' :
      improvement.status === 'COMPLETED' ? 'COMPLÉTÉ' :
        improvement.status === 'SUGGESTION_SENT' ? 'SUGGESTION ENVOYÉE' :
          improvement.status === 'IN_REVIEW' ? 'EN REVUE' : 'EN COURS',
    listingId: improvement.listingId,
    improvementData: improvement
  }));

  const handleViewAnnouncement = (approval) => {
    navigate(`/admin/announcement/${approval.id}`, {
      state: { improvementId: approval.id }
    });
  };

  const handlePublishDirect = async (approval) => {
    try {
      await updateImprovementStatus({
        id: approval.id,
        data: { status: 'COMPLETED' }
      }).unwrap();
      toast.success('Annonce publiée avec succès');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Erreur lors de la publication');
      console.error('Error publishing improvement:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    if (status === 'EN ATTENTE') {
      return 'bg-[#FFEBCC66] text-[#B26800]';
    } else if (status === 'COMPLÉTÉ') {
      return 'bg-[#EBF2F0] text-[#3A7D6C]';
    } else if (status === 'SUGGESTION ENVOYÉE') {
      return 'bg-[#E8F3F1] text-[#3A7D6C]';
    } else if (status === 'EN REVUE') {
      return 'bg-blue-50 text-blue-600';
    }
    return 'bg-gray-100 text-gray-600';
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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-xl">Pipeline d'approbation</h2>
            <p className="mt-1 text-base text-gray-500">
              Gestion du pipeline pour {meta.total} demande(s) d'amélioration
              {debouncedSearch && ` - Résultats pour "${debouncedSearch}"`}
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

            {/* Search Input with Clear Button */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou propriété..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 py-2.5 pr-10 pl-10 text-sm placeholder-gray-400 transition-colors focus:border-[#3A7D6C] focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Search Filter Display */}
        {debouncedSearch && (
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-md text-sm border border-gray-200">
              Recherche: {debouncedSearch}
              <button onClick={clearSearch} className="ml-1 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            </span>
          </div>
        )}

        {/* Mobile + Tablet Cards */}
        <div className="space-y-3 p-3 lg:hidden">
          {approvals.map((approval) => (
            <div key={approval.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{approval.property}</p>
                  <p className="truncate text-xs text-gray-500">{approval.email}</p>
                </div>
                <span
                  className={`inline-block shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusBadge(
                    approval.status
                  )}`}
                >
                  {approval.status}
                </span>
              </div>

              <div className="mb-4 rounded-md bg-gray-50 px-3 py-2">
                <p className="text-xs text-gray-500">ID de l'utilisateur</p>
                <p className="text-sm font-medium text-gray-700">{approval.userId}</p>
              </div>

              <div
                className={`grid gap-2 ${approval.status === 'EN ATTENTE' ? 'grid-cols-2' : 'grid-cols-1'}`}
              >
                <button
                  onClick={() => handleViewAnnouncement(approval)}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Eye size={16} />
                  <span>Voir</span>
                </button>
                {approval.status === 'EN ATTENTE' && (
                  <button
                    onClick={() => handlePublishDirect(approval)}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#3A7D6C] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2d5a4e]"
                  >
                    <CheckCircle size={16} />
                    <span>En direct</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-[#F8FBFE]">
              <tr>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Propriétaire
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  ID de l'utilisateur
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Statut
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {approvals.map((approval) => (
                <tr key={approval.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-800 sm:text-base">
                        {approval.property}
                      </p>
                      <p className="text-xs text-gray-500">{approval.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 sm:px-6">{approval.userId}</td>
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        approval.status
                      )}`}
                    >
                      {approval.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewAnnouncement(approval)}
                        className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-gray-300 px-5 py-1 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
                      >
                        <Eye size={16} />
                        <span>Voir</span>
                      </button>
                      {approval.status === 'EN ATTENTE' && (
                        <button
                          onClick={() => handlePublishDirect(approval)}
                          className="inline-flex items-center justify-center gap-1 rounded-full bg-[#3A7D6C] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d5a4e] sm:text-sm"
                        >
                          <CheckCircle size={16} />
                          <span>En direct</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {approvals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {debouncedSearch
                ? `Aucune demande d'amélioration trouvée pour "${debouncedSearch}"`
                : 'Aucune demande d\'amélioration trouvée'}
            </p>
            {debouncedSearch && (
              <button
                onClick={clearSearch}
                className="mt-4 text-[#3A7D6C] hover:underline"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        )}

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
      </div>
    </div>
  );
};

export default ApprovalPipeline;