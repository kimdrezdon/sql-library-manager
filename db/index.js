// require sequelize
const Sequelize = require('sequelize');

// instantiate sequelize and configure it
const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: 'library.db',
    logging: false //disable logging
});

// create the database object
const db = {
    sequelize,
    Sequelize,
    models: {}
};

// requires or loads the Book model defined in the book.js file
db.models.Book = require('./models/book.js')(sequelize);

// exports the database object
module.exports = db;