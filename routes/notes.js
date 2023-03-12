// Modules
const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../Develop/helpers/fsFunnctions');
const uuid = require('../Develop/helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) =>
  readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;
  
    // If all the required properties are present
    if (text && title) {
      // Variable for the object we will save
      const newNote = {
        text,
        title,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './Develop/db/db.json');
      const response = {
        status: 'success',
        body: newNote,
      };
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
});

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./Develop/db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
          const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
      });
  });

// DELETE Route for a specific tip
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./Develop/db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./Develop/db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
module.exports = notes;