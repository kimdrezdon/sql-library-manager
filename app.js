// require sequelize
const Sequelize = require('sequelize');

// instantiate sequelize and configure it
const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: 'library.db',
    logging: false //disable logging
});

// defines and initializes Book model
class Book extends Sequelize.Model {}
Book.init(
    { // attributes object
        title: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        }
    },
    { // options object
        sequelize
    }
);


// async IIFE
(async () => {
    // sync all tables. force:true drops the table that exists each time the app is started and recreates it from the model definition
    await sequelize.sync({ force: true });
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

    }
} ) ();