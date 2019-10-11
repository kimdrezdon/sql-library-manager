//Require express
const express = require("express");
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// imports the database from index.js
const db = require("./db");

//Set Pug as the templating engine
app.set("view engine", "pug");

// sync all tables. force:true drops the table that exists each time the app is started and recreates it from the model definition
db.sequelize.sync();

//Serve static files
app.use("/static", express.static("public"));

//Routes
app.use("/", require("./routes/index"));
app.use("/books", require("./routes/books"));

//Error route
app.use((req, res, next) => {
  res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
});

//Heroku port setup
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
