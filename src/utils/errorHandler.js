export const handleApiError = (error) => {
  if (error?.response) {
    return error.message || `Server error: ${error.response.status}`;
  } else if (error?.request) {
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
};
