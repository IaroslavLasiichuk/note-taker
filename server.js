const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8081;
const api = require('./routes/index.js');

// Static middleware pointing to the public folder
app.use(express.static('develop/public'));
app.use('/css', express.static('public/assets/css'))
app.use('/js', express.static('public/assets/js'))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// Create Express.js routes
// Page with existing notes listed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// Listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, ()=> {
    console.log(`Listening at http://localhost:${PORT}` );
})