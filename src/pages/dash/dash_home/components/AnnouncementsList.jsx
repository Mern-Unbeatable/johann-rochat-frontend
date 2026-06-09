import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Calendar, ChevronRight, Sparkles, Eye } from 'lucide-react';
import { formatDate } from '../../../../utils/formatDate';
import { getStatusLabel, getPropertyTypeLabel } from '../../../../utils/listingUtils';
import { useGetMyListingsQuery } from '../../../../features/api/listingApi';
import LoadingFallback from '../../../../router/components/LoadingFallback';

const AnnouncementsList = ({ currentUser }) => {
  const navigate = useNavigate();
  const { data: myListing, isLoading } = useGetMyListingsQuery({});

  if (isLoading) {
    return <LoadingFallback />;
  }

  const listings = myListing?.listings || [];

  const handleViewDetails = (listingId) => {
    navigate(`/dash/ad-details/${listingId}`);
  };

  const handleGenerateOrEdit = () => {
    navigate(`/creer-annonce/ready`);
  };

  const hasGenerations = (listing) => {
    return listing.generations && listing.generations.length > 0;
  };

  const getGenerationStatus = (listing) => {
    if (hasGenerations(listing)) {
      return 'Génération disponible';
    }
    return 'Non généré';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-2xl font-[500] text-[#2D3748]">
              Liste des annonces créées
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {listings.length} annonce{listings.length !== 1 ? 's' : ''} au total
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 tracking-wider">
            <span className="h-2 w-2 rounded-full bg-[#5A8D84]"></span>
            SÉANCE ACTIVE
          </div>
        </div>

        <div className="p-8 bg-gray-50/30">
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-[#F0F7F5] p-2.5 rounded-xl">
                        <Home size={22} className="text-[#5A8D84]" />
                      </div>
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-md uppercase ${listing.status === 'UNLOCKED'
                        ? 'bg-green-100 text-green-700'
                        : listing.status === 'DRAFT'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-[#E6F9F3] text-[#5A8D84]'
                        }`}>
                        {getStatusLabel(listing.status)}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#2D3748] leading-tight line-clamp-2">
                        {listing.title || listing.listingName || 'Annonce sans titre'}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                        <Calendar size={14} />
                        <span className="text-sm font-medium">
                          {formatDate(listing.createdAt || listing.availableFrom)}
                        </span>
                      </div>
                    </div>

                    {/* Generation Status Badge */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${hasGenerations(listing)
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                        }`}>
                        <Sparkles size={12} />
                        <span>{getGenerationStatus(listing)}</span>
                      </div>
                    </div>

                    <hr className="border-gray-200 my-4" />

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                        {getPropertyTypeLabel(listing.propertyType)}
                      </span>


                      <div className="flex gap-2">
                        <button
                          onClick={() => handleGenerateOrEdit()}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 text-sm font-medium rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-all border border-purple-200"
                          title="Générer ou modifier l'annonce avec l'IA"
                        >
                          <Sparkles size={14} />
                          <span className="hidden sm:inline">Générer</span>
                        </button>


                        <button
                          onClick={() => handleViewDetails(listing.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F7F5] text-[#5A8D84] text-sm font-medium rounded-lg hover:bg-[#E6F9F3] transition-all"
                          title="Voir les détails et suggestions"
                        >
                          <Eye size={14} />
                          <span className="hidden sm:inline">Détails</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="mb-4 text-gray-500">Aucune annonce créée pour le moment</p>
              <Link
                to="/creer-annonce"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2D5A4E] px-6 py-2 font-medium text-white hover:bg-[#24493f] transition-colors"
              >
                + Créer une annonce
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsList;