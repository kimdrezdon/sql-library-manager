//Require express
const express = require('express');
const router = express.Router();

//Book model
const { Book } = require("../db").models;

//GET /books - Display the full list of books 
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.findAll({
            order: [
                ['author', 'ASC'],
                ['year', 'ASC']
            ]
        });
        res.render('index', {
            pageTitle: "Books", 
            books: books
        });
    } catch (err) {
        res.render('error', {error: err, pageTitle: "Server Error"});
    }
});

//GET /books/new - Display the create new book form
router.get('/new', async (req, res, next) => {
    try {
        await Book.build();
        res.render('new-book', {
            pageTitle: "New Book"
        });
    } catch (err) {
        res.render('error', {error: err, pageTitle: "Server Error"});
    }
});

//POST /books/new - Posts a new book to the database
router.post('/new', async (req, res, next) => {
    try {
        await Book.create(req.body);
        res.redirect('/books');
    } catch (err) {
        if(err.name === "SequelizeValidationError") {
            console.log('Sequelize Validation Error thrown');
            const book = await Book.build(req.body);
            const {title, author, genre, year} = book.dataValues;
            const templateData = {
                pageTitle: "New Book",
                title,
                author,
                genre,
                year,
                errors: err.errors
            };
            res.render('new-book', templateData);
        } else {
            res.render('error', {error: err, pageTitle: "Server Error"});
        }
    }
});

//GET /books/:id - Displays the book detail form
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            const {id, title, author, genre, year} = book.dataValues;
        
            const templateData = {
                pageTitle: "Update Book",
                id,
                title,
                author,
                genre,
                year
            };
        
            res.render('update-book', templateData);
        } else {
            res.render('page-not-found', {pageTitle: "Page Not Found"});
        }
    } catch (err) {
        res.render('error', {error: err, pageTitle: "Server Error"});
    }
});

//POST /books/:id - Updates book info in the database
router.post('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        
        if (book) {
            await book.update(req.body);
        } else {
            res.render('page-not-found', {pageTitle: "Page Not Found"});
        }

        res.redirect('/books');
    } catch(err) {
        if(err.name === "SequelizeValidationError") {
            console.log('Sequelize Validation Error thrown');
            const book = await Book.build(req.body);
            const {title, author, genre, year} = book.dataValues;
        
            const templateData = {
                pageTitle: "Update Book",
                id: req.params.id,
                title,
                author,
                genre,
                year,
                errors: err.errors
            };

            res.render('update-book', templateData);
        } else {
            res.render('error', {pageTitle: "Server Error"});
        }
    }
});

//POST /books/:id/delete - Deletes a book, can't be undone
router.post('/:id/delete', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            await book.destroy();
            res.redirect('/books');
        } else {
            res.render('page-not-found', {pageTitle: "Page Not Found"});
        }
    } catch (err) {
        res.render('error', {error: err, pageTitle: "Server Error"});
    }
});

module.exports = router;