export const getStatusLabel = (status) => {
  const statusMap = {
    'DRAFT': 'BROUILLON',
    'PREVIEW': 'APERÇU',
    'PAID': 'PAYÉ',
    'UNLOCKED': 'DÉBLOQUÉ',
    'IMPROVEMENT_REQUESTED': 'AMÉLIORATION',
    'IMPROVEMENT_IN_REVIEW': 'EN RÉVISION',
    'IMPROVEMENT_DONE': 'TERMINÉ'
  };
  return statusMap[status] || status || 'PRÊT';
};

export const getPropertyTypeLabel = (propertyType) => {
  const typeMap = {
    'STUDIO': 'STUDIO',
    'APARTMENT': 'APPARTEMENT',
    'HOUSE': 'MAISON',
    'COMMERCIAL': 'COMMERCIAL'
  };
  return typeMap[propertyType] || "PROJET D'IA";
};