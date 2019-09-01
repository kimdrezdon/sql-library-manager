// require sequelize
const Sequelize = require('sequelize');

// defines, initializes and exports Book model
module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init(
        { // attributes object
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { 
                        // custom error message for NULL values (thrown by allowNull: false)
                        msg: 'Please provide a value for "title"'
                    },
                    notEmpty: { 
                        // custom error message for empty strings (thrown by STRING data type)
                        msg: 'Please provide a value for "title"'
                    }
                }
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { 
                        // custom error message for NULL values (thrown by allowNull: false)
                        msg: 'Please provide a value for "author"'
                    },
                    notEmpty: { 
                        // custom error message for empty strings (thrown by STRING data type)
                        msg: 'Please provide a value for "author"'
                    }
                }
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