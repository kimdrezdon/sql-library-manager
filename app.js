//Require express
const express = require("express");
const app = express();

// imports the database from index.js
const db = require('./db');

//Set Pug as the templating engine
app.set("view engine", "pug");

// destructures the Book model imported from db.models
const { Book } = db.models;

// async IIFE
(async () => {
    // sync all tables. force:true drops the table that exists each time the app is started and recreates it from the model definition
    await db.sequelize.sync({ force: true });
    try { 
        // waits until all promises are returned by the Model.create() method are fulfilled
        await Promise.all([
            Book.create({
                title: "Harry Potter and the Philosopher's Stone",
                author: 'J.K. Rowling',
                genre: 'Fantasy',
                year: 1997
            })
        ]);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // maps the errors array to display all the error messages
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            // rethrows other types of errors caught by catch (general errors, record missing, unforseen errors)
            throw error;
        }
    }
} ) ();

//Routes
app.use('/', (req, res) => {
    res.send('I love pasta!')
});

//Heroku port setup
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});