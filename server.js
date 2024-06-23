const express = require("express");
const fs = require("fs/promises"); //can manipulate files with fs modify, delete, ...
const path = require("path");

const app = express();

let PORT = process.env.PORT || 4000;
let noteId = 1;
app.use(express.json()); //functions that we want to use on all routs(middlewears)
app.use(express.static("public")); // public automatically applies index.js and styles.css

app.get("/api/notes", (req, res) => {
  const notes = fs.readFile("./db/db.json"); // to read file from json or any file
  console.log("getting all notes ...");
  console.log({ req, res });
  notes.then((result) => {
    console.log(result);
    const parsedResults = JSON.parse(result);
    console.log(parsedResults);
    res.status(200).json(parsedResults);
  });
});

app.get("/api/notes/:id", (req, res) => {
  console.log("getting note with id", req.params);
});

app.post("/api/notes", (req, res) => {
  console.log("creating/posting new note", req.body);

  if (!req.body.text || !req.body.title) {
    return res.status(400).send("Missing title and/or text on request body!");
  }
  noteId++;

  const newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text,
  };
  const notes = fs.readFile("./db/db.json"); // to read file from json or any file
  notes.then((result) => {
    const parsedResults = JSON.parse(result);
    // const lastNote = parsedResults[parsedResults.length - 1];
    parsedResults.push(newNote);
    console.log(parsedResults);
    fs.writeFile("./db/db.json", JSON.stringify(parsedResults));
    res.status(200).send(newNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("deleting note with id", req.params);
  const notes = fs.readFile("./db/db.json"); // to read file from json or any file
  notes.then((result) => {
    const parsedResults = JSON.parse(result);
    const updatedNotes = parsedResults.filter(
      (note) => note.id !== parseInt(req.params.id)
    );
    console.log(updatedNotes);
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotes));
    res.status(200).send("Note has been deleted");
  });
});

console.log("starting note-taker...");

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(
    `express server listening for requests at http://localhost:${PORT}`
  );
});
