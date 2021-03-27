const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

// Initialize Express
const app = express()

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({
  defaultLayout: "main",
  helpers:{
    // Function to do basic mathematical operation in handlebar
    math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }
}}));
app.set("view engine", "handlebars");

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/snek";
MONGODB_URI = "mongodb+srv://claudiodb:123321@gamedesigndb.hicaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI);

// EXPRESS:

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on " + "http://localhost:"+ PORT + "/  !");
});

