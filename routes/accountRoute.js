// Process the login request
router.post(
    "/login", utilities.checkLogin,
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  );
