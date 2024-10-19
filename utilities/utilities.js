// utilities.js

// Example of handleErrors function
const handleErrors = (controllerFunction) => {
    return async (req, res, next) => {
      try {
        await controllerFunction(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };
  
  // Export the function
  module.exports = {
    handleErrors,
    // ... other exports
  };
  