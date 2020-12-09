import NotesData from "../data/notes"

export class Note {
    constructor(note) {
        this.id = note.id;
        this.title = note.title;
        this.content = note.content;
        this.isFavorite = note.isFavorite;
        this.isOpened = note.isOpened;
        this.ownerId = note.ownerId;
        this.date = note.date
    }

    editNote(newData) {
        if (newData.title) {
            this.title = newData.title;
        }
        if (newData.content) {
            this.content = newData.content;
        }
        if (newData.date) {
            this.date = newData.date;
        }
    }

    switchFavorite() {
        this.isFavorite = !this.isFavorite;
    }

    switchOpened() {
        this.isOpened = !this.isOpened
    }
}

export class Notes {
    constructor(ownerId) {
        this.ownerId = ownerId;
        this.allNotes = [];
        for (var note of NotesData) {
            this.allNotes.push(new Note(note))
        }
    }

    getNote(id) {
        return this.allNotes.find(
            (item) => item.id === id
        )
    }

    createNewNote(note) {
        this.allNotes.push(new Note(note));
    }

    getFavoriteNotes(title = "") {
        return this.getAllNotesForOwner(title).filter(
            (item) => {
                return item.isFavorite;
            }
        )
    }

    sortNotes(notes) {
        return notes.sort(
            (a, b) => {
                if (a.date > b.date) return 1;
                if (a.date < b.date) return -1;
                return 0;
            }
        )
    }

    getAllNotesForOwner(title = "") {
        const ownersNotesOnly = this.allNotes.filter(
            (item) => item.ownerId === this.ownerId
        );
        const openedNotOwnersNotes = this.allNotes.filter(
            (item) => item.isOpened && item.ownerId !== this.ownerId
        );
        const ownersAllNotes = this.sortNotes(
            ownersNotesOnly.concat(
                openedNotOwnersNotes
            )
        );
        return ownersAllNotes.filter(
            (item) => {
                return item.title.includes(title);
            }
        )
    }

    deleteNote(id) {
        var index = this.allNotes.findIndex(
            (item) => {
                return item.id = id;
            }
        )
        this.allNotes.splice(index, 1);
    }
}