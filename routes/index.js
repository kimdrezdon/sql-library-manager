//Require express
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.redirect("/books"));

//Error route
router.use((req, res, next) => {
    res.render('page-not-found', {pageTitle: "Page Not Found"});
});

module.exports = router;