const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();


// copied paste from activites 22
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname + "/db/db.json"), function (err, data){
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  
  fs.readFile(path.join(__dirname + "/db/db.json"), function (err, data){
    const notes = JSON.parse(data);
    const newSave = {
      title: req.body.title,
      text: req.body.text,
      //in order to add multiple saves create new id each time
      id: Math.random().toString(36).substr(2, 9)
    };
    notes.push(newSave);
    let noteJSON = JSON.stringify(notes);
    
    fs.writeFile(path.join(__dirname + "/db/db.json"), noteJSON, (err) => {
      res.json(noteJSON);
    })
  });
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
