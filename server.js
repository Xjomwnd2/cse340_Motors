/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const router = new express.Router();
const invControllers = require("./controllers/invControllers");
const utilities = require("./utilities");
const invValidate = require("../utilities/inventory-validation");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pool = require('./database/');
const inventoryRoute = require('./routes/inventoryRoute'); // adjust the path based on your folder structure

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs"); 
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root 

/* ***********************
 * Middleware
 * ************************/
// Set up middleware
app.use(cookieParser());

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET || 'yourSecretKey', // Ensure the secret is set
  resave: false, // Changed from true to avoid unnecessary session resaving
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
})); 

/* ***********************
 * Routes
 *************************/
app.use(static);
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));
// Inventory route
app.use("/inv", inventoryRoute);
// Account Route
app.use("/account", accountRoute);
// File not found route
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
});
/////////////////////////// Routes to vehicle management /////////////////////////////////////
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.showManagementPage)
);

router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByVehicleId)
);

router.get(
  "/new-classification",
  utilities.checkLogin,
  utilities.checkUserLevel,
  utilities.handleErrors(invController.buildNewClassification)
);
///////////////////////


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/

/* ***********************
 * Log statement to confirm server operation
 *************************/
const PORT = process.env.PORT || 5500; // Ensure there's a default port

app.listen(PORT, () => {
  console.log(`app listening on localhost:${PORT}`);
});
