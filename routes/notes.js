const notes = require('express').Router();
// Helper function to generate unique ids
const { v4: uuidv4 } = require('uuid');
// Helper functions for reading and writing to the JSON file
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Makes a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Saves that array to the filesystem
      writeToFile('./db/db.json', result);

      // Responds to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new notes
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully!`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
