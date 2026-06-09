  export const formatStatus = (status) => {
    if (status === 'SUCCESS') return 'PAYÉ';
    if (status === 'PENDING') return 'EN ATTENTE';
    if (status === 'FAILED') return 'ÉCHOUÉ';
    return status;
  };