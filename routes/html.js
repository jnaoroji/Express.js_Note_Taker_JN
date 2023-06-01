//imports express and path package
const router = require('express').Router();
const path = require("path");

// HTML routes to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//wildcard route to index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;
