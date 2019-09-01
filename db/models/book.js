// require sequelize
const Sequelize = require('sequelize');

// defines, initializes and exports Book model
module.exports = (sequelize) => {
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

    return Book;
};