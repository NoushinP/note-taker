const express = require("express");
const fs = require("fs/promises"); //can manipulate files with fs modify, delete, ...
const path = require("path");

const app = express();
const notes = fs.readFile("/db/db.json"); // to read file from json or any file
let PORT = process.env.PORT || 4000;
app.use(express.json()); //functions that we want to use on all routs(middlewears)

app.get("/api/notes", (req, res) => {
  console.log("getting all notes ...");
  console.log({ req, res });
  notes.then((result) => {
    console.log(result);
  });
  console.log(notes);
  res.status(200).json(notes);
});

console.log("starting note-taker...");

app.listen(PORT, () => {
  console.log(
    `express server listening for requests at http://localhost:${PORT}`
  );
});
