//import all dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
//import middlewear
const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// GET HTML routes for homepage
app.get('/api/notes', (req, res) => {
  const notesData = fs.readFileSync('db.json', 'utf8');
  const notes = JSON.parse(notesData);
  res.json(notes);
});

// GET Route for notes page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// POST Route for disgnostics page
app.post('/api/notes', (req, res) => {
  const notesData = fs.readFileSync('db.json', 'utf8');
  const notes = JSON.parse(notesData);
  const newNote = req.body;
  newNote.id = uuid(); // You can use a package to generate a unique ID
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes));
  res.json(newNote);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
