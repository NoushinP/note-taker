const express = require("express");
const fs = require("fs/promises"); //can manipulate files with fs modify, delete, ...
const path = require("path");
const { title } = require("process");

const app = express();
const notes = fs.readFile("./db/db.json"); // to read file from json or any file
let PORT = process.env.PORT || 4000;
let noteId = 1;
app.use(express.json()); //functions that we want to use on all routs(middlewears)

app.get("/api/notes", (req, res) => {
  console.log("getting all notes ...");
  console.log({ req, res });
  notes.then((result) => {
    console.log(result);
    const parsedResults = JSON.parse(result);
    console.log(parsedResults);
    res.status(200).json(parsedResults);
  });
  //   console.log(notes);
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

  notes.then((result) => {
    const parsedResults = JSON.parse(result);
    const lastNote = parsedResults[parsedResults.length - 1];
    console.log(lastNote);
    parsedResults.push(newNote);
    console.log(parsedResults);
    res.status(200).send("created new note successfully!");
  });
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("deleting note with id", req.params);
});

console.log("starting note-taker...");

app.listen(PORT, () => {
  console.log(
    `express server listening for requests at http://localhost:${PORT}`
  );
});
