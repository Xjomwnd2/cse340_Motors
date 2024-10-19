const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); // Ensure the path is correct
const regValidate = require('../utilities/registration-validation'); // If needed for validation
const utilities = require('../utilities'); // Assuming you have utility functions

// Route to deliver the login view (GET /login)
router.get(
  '/login', 
  utilities.handleErrors(accountController.buildLogin) // Serves the login page
);

// Process the login request (POST /login)
router.post(
  '/login', 
  utilities.checkLogin,
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin) // Handles login form submission
);

module.exports = router;
