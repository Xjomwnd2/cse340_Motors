// registration-validation.js

// Function to validate registration data
const validateRegistration = (data) => {
    const errors = {};
  
    // Check for required fields
    if (!data.username || data.username.trim() === '') {
      errors.username = 'Username is required';
    }
  
    if (!data.password || data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    if (!data.email || !validateEmail(data.email)) {
      errors.email = 'Valid email is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0, // If there are no errors
      errors,
    };
  };
  
  // Helper function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Export the validation function
  module.exports = { validateRegistration };
  