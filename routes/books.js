//Require express
const express = require('express');
const router = express.Router();

//Book model
const { Book } = require("../db").models;

//GET /books - Display the full list of books 
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.findAll();
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
        res.render('new-book', {
            book: Book.build(), 
            pageTitle: "New Book"
        });
    } catch (err) {
        res.render('error', {error: err, pageTitle: "Server Error"});
    }
});

//POST /books/new - Posts a new book to the database
router.post('/new', async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.redirect('/books/' + book.dataValues.id);
    } catch (err) {
        if(err.name === "SequelizeValidationError") {
            console.log('Sequelize Validation Error thrown');
            res.render('new-book', {
                book: Book.build(req.body),
                pageTitle: "New Book",
                errors: err.errors
            })
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
            const pageTitle= book.dataValues.title;
            const {id, title, author, genre, year} = book.dataValues;
        
            const templateData = {
                pageTitle,
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
            book.update(req.body);
        } else {
            res.render('page-not-found', {pageTitle: "Page Not Found"});
        }

        res.redirect(`/books/${book.dataValues.id}`);
    } catch(err) {
        if(err.name === "SequelizeValidationError") {
            let book = Book.build(req.body);
            book.id = req.params.id;

            res.render('update-book', {
                book: book,
                pageTitle: book.dataValues.title,
                errors: err.errors
            })
        } else {
            res.render('error', {pageTitle: "Server Error"});
        }
    }
});

module.exports = router;