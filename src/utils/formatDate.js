
  export const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };