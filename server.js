/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const dotenv = require("dotenv");

const utilities = require('./utilities');
const baseController = require('./controllers/baseController');
const accountRoute = require('./routes/accountRoute');
const invController = require("./controllers/invControllers");
const { validateInventory } = require('./utilities/inventory-validation.js');
const static = require("./routes/static");
const pool = require('./database/');
const inventoryRoute = require('./routes/inventoryRoute');

dotenv.config();

const app = express();
const router = express.Router();

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Middleware
 *************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: new pgSession({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

/* ***********************
 * Routes
 *************************/
app.use(static);
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);

// Vehicle management routes
router.get("/", utilities.checkLogin, utilities.checkUserLevel, utilities.handleErrors(invController.showManagementPage));
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByVehicleId));
router.get("/new-classification", utilities.checkLogin, utilities.checkUserLevel, utilities.handleErrors(invController.buildNewClassification));

app.use("/vehicle", router);

// 404 - File Not Found
app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).render('errors/error', { title: status, message: err.message });
});

/* ***********************
 * Server Activation
 *************************/
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));