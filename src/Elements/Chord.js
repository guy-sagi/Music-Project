import MusicUtils from "../utils/MusicUtils.js";

class Chord {
    label; // String
    id; // Integer
    suffix; // String
    intervals = []; // Array
    staffIntervals = []; // Array
    altered = false; // Boolean
    alteredObj; // Reference to Chord object
    timeInterval; // Float
    alterations = []; // Array

    constructor(details, timeInterval) {
        this.label = details.label;
        this.id = details.id;
        this.suffix = details.suffix;
        if (details.altered) {
            this.altered = details.altered;
            this.alteredObj = this.getChordById(details.alteredObjId);
            this.alterations = [...details.alterations];
        }
        this.intervals = [...details.intervals];
        this.staffIntervals = details.altered ? [...this.alteredObj.staffIntervals] : [...details.staffIntervals];
        this.timeInterval = timeInterval;
    }

    playChord = function (rootNote) {
        MusicUtils.playPianoNotes(rootNote, this);
    }

    getChordById = function (chordId) {
        return MusicUtils.getChords()[chordId];
    }
}

export default Chord;