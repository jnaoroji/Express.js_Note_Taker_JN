const router = require('express').Router();
const path = require("path");

// Import our modular routers for /notes
//const notesRouter = require('./notes');


//const app = express();

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;
