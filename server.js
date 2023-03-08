// Modules
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Create Express.js routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
  });
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});
  
fs.appendFile('Develop/db/db.json', 'Something', () => {
  console.log('Works');
})

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, ()=> {
    console.log(`Listening at http://localhost:${PORT}` );
})