const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/registration-validation');
const utilities = require('../utilities');

// Route to deliver the login view (GET /login)
router.get('/login', (req, res, next) => {
  try {
    accountController.buildLogin(req, res);
  } catch (error) {
    next(error);
  }
});

// Process the login request (POST /login)
router.post(
  '/login',
  utilities.checkLogin,
  regValidate.loginRules(),
  regValidate.checkLoginData,
  (req, res, next) => {
    try {
      accountController.accountLogin(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;