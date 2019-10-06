//Require express
const express = require("express");
const router = express.Router();

//Book model
const { Book } = require("../db").models;

const { sequelize } = Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      res.status(500).render("error", { error: error, pageTitle: "Server Error" });
    }
  }
}

//GET /books - Display the full list of books ordered by author then year
router.get("/", asyncHandler(async (req, res, next) => {
  const books = await Book.findAll({
    order: [
      [sequelize.fn("upper", sequelize.col("author")), "ASC"],
      ["year", "ASC"]
    ]
  });
  res.render("index", { pageTitle: "My Library", books: books });
}));

//GET /books/new - Display the create new book form
router.get("/new", (req, res, next) => {
  res.render("new-book", { pageTitle: "New Book" });
});

//POST /books/new - Posts a new book to the database
router.post("/new", asyncHandler(async (req, res, next) => {
  try {
    await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const book = await Book.build(req.body);
      const templateData = {
        pageTitle: "New Book", 
        book: book.dataValues, 
        errors: error.errors
      }
      res.render("new-book", templateData);
    } else {
      throw error;
    }
  }
}));

//GET /books/:id - Displays the book detail form
router.get("/:id", asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    const templateData = {
      pageTitle: "Update Book", 
      id: book.dataValues.id, 
      book: book.dataValues
    };
    res.render("update-book", templateData);
  } else {
    res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
  }
}));

//POST /books/:id - Updates book info in the database
router.post("/:id", asyncHandler(async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
    } else {
      res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
    }
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const book = await Book.build(req.body);
      const templateData = { 
        pageTitle: "Update Book", 
        id: req.params.id, 
        book: book.dataValues, 
        errors: error.errors 
      };
      res.render("update-book", templateData);
    } else {
      throw error;
    }
  }
}));

//GET /books/:id/delete - Displays the delete book confirmation screen
router.get("/:id/delete", asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render("delete", { book: book.dataValues, pageTitle: "Delete Book" });
  } else {
    res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
  }
}))

//POST /books/:id/delete - Deletes a book, can't be undone
router.post("/:id/delete", asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.status(404).render("page-not-found", { pageTitle: "Page Not Found" });
  }
}));

module.exports = router;
