const util = require('util');
const fs = require('fs');
const uuiidv1 = require('uuid/v1');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
        let parsedNotes = JSON.parse(notes);
        return parsedNotes;
      })
      .catch((err) => {
        throw err;
      });
  }

  addNote(note) {
    const {title, text} = note;
    if (!title || !text) {
      throw new Error("Must have 'text' and 'title'");
    }
    const newNote = {title, text, id: uuiidv1()};

    return this.getNotes()
    .then((notes) => [...notes, newNote])
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote);
  }
}

module.exports = new Store();