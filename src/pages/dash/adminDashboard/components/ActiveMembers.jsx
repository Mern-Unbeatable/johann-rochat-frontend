import React, { useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { useGetAllUsersQuery, useAddCreditsOnlyMutation, useAssignPackageMutation } from '../../../../features/api/userApi';
import CreditModal from './CreditModal';
import toast from 'react-hot-toast';

const ActiveMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData, refetch, isLoading: usersLoading } = useGetAllUsersQuery({});
  const [addCreditsOnly, { isLoading: addingCredits }] = useAddCreditsOnlyMutation();
  const [assignPackage, { isLoading: assigningPackage }] = useAssignPackageMutation();

  const users = userData?.users || [];
  const meta = userData?.meta || { total: 0 };

  // Filter users based on search term
  const filteredMembers = users.filter(member => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.name?.toLowerCase().includes(searchLower) ||
      member.email?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate member type based on credits or package
  const getMemberType = (member) => {
    if (member.package !== null || (member.payments?.length > 0)) {
      return 'PAYÉ';
    }
    return 'GRATUIT';
  };

  // Handle add credits button click
  const handleAddCredits = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAddCreditsSubmit = async (userId, credits) => {
    try {
      await addCreditsOnly({
        id: userId,
        amount: credits,
        reference: `Admin added ${credits} credits`
      }).unwrap();

      toast.success(`${credits} crédit(s) ajouté(s) avec succès!`);
      await refetch();
      return true;
    } catch (error) {
      console.error('Error adding credits:', error);
      toast.error(error?.data?.message || 'Erreur lors de l\'ajout des crédits');
      throw error;
    }
  };

  // Handle package assignment
  const handleAssignPackage = async (userId, packageId) => {
    try {
      await assignPackage({ id: userId, packageId }).unwrap();
      toast.success('Forfait assigné avec succès!');
      await refetch();
      return true;
    } catch (error) {
      console.error('Error assigning package:', error);
      toast.error(error?.data?.message || 'Erreur lors de l\'assignation du forfait');
      throw error;
    }
  };

  // Get announcement count from listings
  const getAnnouncementCount = (member) => {
    return member.listings?.length || 0;
  };

  const isLoading = usersLoading || addingCredits || assigningPackage;

  return (
    <div className="mx-auto max-w-7xl px-4 py-1 pb-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 sm:text-xl">Membres actifs</h2>
            <p className="mt-1 text-base text-gray-500">
              Gestion de l'accès pour {filteredMembers.length} utilisateur{filteredMembers.length !== 1 ? 's' : ''} sur {users.length} au total
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher des utilisateurs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-primary w-full rounded-lg border-2 border-gray-200 py-2.5 pr-4 pl-10 text-sm placeholder-gray-400 transition-colors focus:outline-none"
            />
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-[#F8FBFE]">
              <tr>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Entité Suisse
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Embailler
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  Équilibre
                </th>
                <th className="px-5 py-3 text-base font-[400] text-gray-600 uppercase sm:px-6">
                  AJUSTEMENTS DU GRAND Livre
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4 sm:px-6">
                    <div>
                      <p className="text-sm font-medium text-gray-800 sm:text-base">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={`inline-block rounded-lg px-3 py-1 text-sm font-semibold ${getMemberType(member) === 'PAYÉ'
                        ? 'border border-[#3A7D6C1F] bg-[#EBF2F0] text-[#3A7D6C]'
                        : 'bg-[#EBF2F0] text-[#6B7280]'
                        }`}
                    >
                      {getMemberType(member) === 'PAYÉ' ? 'MEMBRE PAYÉ' : 'MEMBRE GRATUIT'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-base text-gray-600 sm:px-6">
                    <span className="font-[600]">{getAnnouncementCount(member)}</span> annonce
                    {getAnnouncementCount(member) !== 1 ? 's' : ''}
                  </td>
                  <td className="px-5 py-4 sm:px-6">

                    <div>

                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1 rounded-full border-2 border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                          <span>+1 Pack</span>
                        </button>
                        <button
                          onClick={() => handleAddCredits(member)}
                          className="bg-primary hover:bg-opacity-90 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-white transition-colors"
                        >
                          <span>Crédit d'aides</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>



                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - Mobile & Tablet */}
        <div className="lg:hidden">
          <div className="divide-y divide-gray-100">
            {filteredMembers.map((member) => (
              <div key={member.id} className="px-5 py-4 transition-colors hover:bg-gray-50 sm:px-6">
                <div className="mb-4">
                  <p className="text-base font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">Embailler</p>
                    <span
                      className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold ${getMemberType(member) === 'PAYÉ'
                        ? 'border border-[#3A7D6C1F] bg-[#EBF2F0] text-[#3A7D6C]'
                        : 'bg-[#EBF2F0] text-[#6B7280]'
                        }`}
                    >
                      {getMemberType(member) === 'PAYÉ' ? 'MEMBRE PAYÉ' : 'MEMBRE GRATUIT'}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">Équilibre</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-[600]">{getAnnouncementCount(member)}</span> annonce
                      {getAnnouncementCount(member) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>





                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">Actions</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddCredits(member)}
                      disabled={isLoading}
                      className="bg-primary hover:bg-opacity-90 inline-flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-colors disabled:opacity-50"
                    >
                      <span>Crédit d'aides</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onAddCredits={handleAddCreditsSubmit}
        onAssignPackage={handleAssignPackage}
        isLoading={addingCredits || assigningPackage}
      />
    </div>
  );
};

export default ActiveMembers;