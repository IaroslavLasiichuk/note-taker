// Modules
const notes = require('express').Router();
const fs = require('fs');
const { readAndAppend, readFromFile, writeToFile } = require('../Develop/helpers/fsFunnctions');
const uniqid = require('uniqid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.readFile('./Develop/db/db.json', (err, data) => {
        (err) ? err : res.json(JSON.parse(data));
    });
});

// POST Route for notes
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;
    // If all the required properties are present
    if (text && title) {
        // Variable for the object we will save
        const newNote = { text, title, id: uniqid() };
        fs.readFile('./Develop/db/db.json', (err, data) => {
            (err) ? err : res.json(JSON.parse(data));
             // Convert string into JSON object
            const parsedNote = JSON.parse(data);
            // Add a new review
            parsedNote.push(newNote);
            fs.writeFileSync('./Develop/db/db.json', JSON.stringify(parsedNote, null, 4), (err) => {
                const response = {
                    status: 'success',
                    body: newNote,
                };
                res.json(response);
                console.log(response);
                if (err) throw err;
            })
        })
    }
});

// GET Route for a specific note
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./Develop/db/db.json', (err, data) => {
        (err) ? err : res.json(JSON.parse(data)); 
        console.log(noteId);
    })
    readFromFile('./Develop/db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No tip with that ID');
        });
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    // fs.readFile('./Develop/db/db.json', (err, data) => {
    //     (err) ? err : res.json(JSON.parse(data));
       
    //     const result = data.filter((note) => note.id !== noteId);
    //     const output = JSON.stringify(result);
    //     fs.writeFileSync('./Develop/db/db.json', output, (err) => {
    //         if (err) throw err;
    //     })

    // }); 
    readFromFile('./Develop/db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);
            // Save that array to the filesystem
            writeToFile('./Develop/db/db.json', result);
            // Respond to the DELETE request
           
            console.log( res.json(`Item ${noteId} has been deleted 🗑️`));
        });
});

module.exports = notes;

