// utilities.js

// Define the handleErrors function
const handleErrors = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
};

// Define the checkLogin function
const checkLogin = (req, res, next) => {
  // Your login checking logic here
  next();
};

// Export the functions
module.exports = {
  handleErrors,
  checkLogin,
  // Include any other utilities if needed
};
