const handleErrors = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the error handler middleware
    }
  };
};

const checkLogin = (req, res, next) => {
  // Your login checking logic here
  next();
};

module.exports = {
  handleErrors,
  checkLogin,
};
