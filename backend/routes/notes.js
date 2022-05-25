const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//ROUTE 1: Get all notes using: GET '/api/notes/getuser || Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  //If there are error(s), return bad request status and error(s) || Login Not Required
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: Add a new note using: POST '/api/notes/addnote || Login Required
router.post(
  "/addnote",
  [body("title", "Enter valid title").exists()],
  fetchuser,
  async (req, res) => {
    //If there are error(s), return bad request status and error(s) || Login Not Required
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

    const { title, description, tag } = req.body;

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Updating an existing note using: PUT '/api/notes/updatenote/:id || Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //If there are error(s), return bad request status and error(s) || Login Not Required
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  const { title, description, tag } = req.body;
  try {
    //Create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be update and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Confirming that the note belongs to the user of not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Invalid Command");
    }

    //Updating the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 4: Deleting an existing note using: DELETE '/api/notes/deletenote/:id || Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //If there are error(s), return bad request status and error(s) || Login Not Required
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

  const { title, description, tag } = req.body;

  try {
    //Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Confirming that the note belongs to the user of not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Invalid Command");
    }

    //Deleting the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("Success : The note has been deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
