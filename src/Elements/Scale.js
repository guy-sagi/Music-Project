import MusicUtils from "../utils/MusicUtils.js";

class Scale {
    label; // String
    id; // Integer
    intervals = []; // Array
    staffIntervals = []; // Array
    altered = false; // Boolean
    alteredObj; // Reference to Chord object
    timeInterval; // Float
    alterations = []; // Array

    constructor(details, timeInterval) {
        this.label = details.label;
        this.id = details.id;
        if (details.altered) {
            this.altered = details.altered;
            this.alteredObj = this.getScaleById(details.alteredObjId);
            this.alterations = [...details.alterations];
        }
        this.intervals = [...details.intervals];
        this.staffIntervals = details.altered ? [...this.alteredObj.staffIntervals] : [...details.staffIntervals];
        this.timeInterval = timeInterval;
    }

    playScale = function (rootNote) {
        MusicUtils.playPianoNotes(rootNote, this);
    }

    getScaleById = function (scaleId) {
        return MusicUtils.getScales()[scaleId];
    }
}

export default Scale;