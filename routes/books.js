//Require express
const express = require('express');
const router = express.Router();

//Book model
const { Book } = require("../db").models;

//error handling middleware
function asyncHandler (cb) {
    return async (req, res, next) => {
        try {
            await cb (req, res, next);
        } catch (err) {
            res.render('error', {error: err, pageTitle: "Server Error"});
        }
    }
}

//GET /books - Display the full list of books 
router.get('/', asyncHandler ( async (req, res) => {
        const books = await Book.findAll();
        res.render('index', {
            pageTitle: "Books", 
            books: books
        });
}));

module.exports = router;