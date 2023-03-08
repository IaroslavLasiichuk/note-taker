// Modules
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;
const data = require('./Develop/db/db.json');

// Static middleware pointing to the public folder
app.use(express.static('develop/public'));
app.use('/css', express.static('public/assets/css'))
app.use('/js', express.static('public/assets/js'))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create Express.js routes
// Landing page with a link to a notes page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
  });
// Page with existing notes listed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(data));

// Listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, ()=> {
    console.log(`Listening at http://localhost:${PORT}` );
})