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
                        msg: 'Please provide a Title'
                    },
                    notEmpty: { 
                        // custom error message for empty strings (thrown by STRING data type)
                        msg: 'Please provide a Title'
                    }
                }
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { 
                        // custom error message for NULL values (thrown by allowNull: false)
                        msg: 'Please provide an Author'
                    },
                    notEmpty: { 
                        // custom error message for empty strings (thrown by STRING data type)
                        msg: 'Please provide an Author'
                    }
                }
            },
            genre: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.INTEGER,
                validate: {
                    len: {
                        args: 4,
                        msg: 'Year must be exactly 4 digits'
                    }
                }
            }
        },
        { // options object
            sequelize
        }
    );

    return Book;
};