const router = require('express').Router();
const path = require('path');

//return notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//return index.html file
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

 module.exports = router;