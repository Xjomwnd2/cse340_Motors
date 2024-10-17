/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const pool = require('./database/');
const baseController = require("./controllers/baseController");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs"); 
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root 
app.use(cookieParser())

/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


/* ***********************
 * Routes
 *************************/
app.use(static);
// Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"});
});
// Inventory routes
app.use("/inv", inventoryRoute);
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