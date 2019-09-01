// imports the database from index.js
const db = require('./db');

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