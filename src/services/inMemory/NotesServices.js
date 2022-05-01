const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotfoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updateAt,
    };
    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNotById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotfoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.finfIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotfoundError('Gagal memperbarui catatan. id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();
    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotfoundError('Catatan gagal dihapus.id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
