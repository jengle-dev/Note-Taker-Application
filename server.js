const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//fetch
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.send(data);
    }
  })
});

app.post('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      var newNote = req.body;
      var parsedNote = JSON.parse(data); //puts it back to data for an array
      // how to put newNote into parsedNote
      parsedNote.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(parsedNote), (err) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          res.status(200);
          document.location.reload();
        }
      })
    }
  })
});

app.delete('/api/notes/:id', (req, data) => {
  // array equal to parameter id to remove and then rewrite the file without that line
  const idToDelete = parseInt(req.params.id);
  let dataArray = data;

  const deleteIndex = dataArray.indexOf(idToDelete);
  //remove the index line
  if (deleteIndex > -1) {
    dataArray.splice(deleteIndex, 1);
    res.send(`Deleted data row with id ${idToDelete} from the db array.`);
    document.location.reload();
  } else {
    res.sent(`Data row with id ${idToDelete} is not found in the db array.`);
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
