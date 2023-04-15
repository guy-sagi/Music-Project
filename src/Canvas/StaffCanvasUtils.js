import { staffCnsts } from "../modules/Constants.js";

staffCnsts.initialize();

const canvasDiv = document.querySelector('.staff-canvas');
const canvas = document.getElementById('staffCanvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the div containing the canvas
canvasDiv.style.width = staffCnsts.STAFF_SIZE.width + 'px';
canvasDiv.style.height = staffCnsts.STAFF_SIZE.height + 'px';

// Set the width and height of the canvas element
canvas.width = staffCnsts.STAFF_SIZE.width;
canvas.height = staffCnsts.STAFF_SIZE.height;
canvas.style.background = 'white'

function getCanvas() {
    return canvas;
}

function getContext() {
    return ctx;
}

function strokeStaffBody() {
    // initialize
    const startX = staffCnsts.STAFF_SIZE.width - staffCnsts.STAFF_LENGTH;
    const finalX = staffCnsts.STAFF_SIZE.width - startX;
    const startY = 2 * staffCnsts.STAFF_GAP_SIZE.height;

    // Draws the 5 lines of the Staff 
    ctx.beginPath();
    for (let i = 1; i < 6; i++) {
        ctx.moveTo(startX, startY + staffCnsts.STAFF_GAP_SIZE.height * i);
        ctx.lineTo(finalX, startY + staffCnsts.STAFF_GAP_SIZE.height * i);
    }

    // Draws the end of the Staff bars
    ctx.lineWidth = 1;
    ctx.moveTo(finalX - 3 * staffCnsts.STAFF_SIZE.width / 200, startY + staffCnsts.STAFF_GAP_SIZE.height);
    ctx.lineTo(finalX - 3 * staffCnsts.STAFF_SIZE.width / 200, startY + staffCnsts.STAFF_GAP_SIZE.height * 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = staffCnsts.STAFF_SIZE.width / 100;
    ctx.moveTo(finalX - staffCnsts.STAFF_SIZE.width / 200, startY + staffCnsts.STAFF_GAP_SIZE.height);
    ctx.lineTo(finalX - staffCnsts.STAFF_SIZE.width / 200, startY + staffCnsts.STAFF_GAP_SIZE.height * 5);
    ctx.stroke();

    loadGClefImage();
}

function strokeStaffNotes(notes, obj, type, alteredNotes) {
    // Retrieves the number of sharps/flats of the current scale
    let alts = { num: 0, type: '' };
    if (type == 'scale') {
        alts = obj.altered ? getAltsDetails(alteredNotes) : getAltsDetails(notes);
    }

    // Loads the sharps/flats according to the scale if needed
    if (alts.num >= 0) {
        alts.type == 'sharp' ? loadSharpImage(0, alts.num) : loadFlatImage(0, alts.num);
    }

    // Loads the 4/4 symbol
    loadFourFourthsImage(alts.num);

    let barX = (staffCnsts.STAFF_LENGTH + staffCnsts.FOUR_FOURTHS_IMG_PROPS.width + staffCnsts.FOUR_FOURTHS_IMG_PROPS.x + (alts.num + 2)*staffCnsts.FLAT_IMG_PROPS.gaps.x)/2;
    let barLength = staffCnsts.STAFF_LENGTH - barX;
    let gap = barLength/4;
    const startX = 2*barX - staffCnsts.STAFF_LENGTH + gap;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(barX, 3 * staffCnsts.STAFF_GAP_SIZE.height);
    ctx.lineTo(barX, 7 * staffCnsts.STAFF_GAP_SIZE.height);
    ctx.stroke();

    // Loads the notes
    loadNoteImage(0, notes, alteredNotes, startX, barLength/6, gap, type);
}

/*
function OBSOLETE_strokeStaffNotes(notes, type) {
    // Retrieves the number of sharps/flats of the current scale
    let alts = { num: 0, type: '' };
    if (type == "scale") {
        alts = getAltsDetails(notes);
    }

    // Loads the sharps/flats according to the scale if needed
    if (alts.num >= 0) {
        alts.type == 'sharp' ? loadSharpImage(0, alts.num) : loadFlatImage(0, alts.num);
    }

    // Loads the 4/4 symbol
    loadFourFourthsImage(alts.num);

    let barX = (staffCnsts.STAFF_LENGTH + staffCnsts.FOUR_FOURTHS_IMG_PROPS.width + staffCnsts.FOUR_FOURTHS_IMG_PROPS.x + (alts.num + 2) * staffCnsts.FLAT_IMG_PROPS.gaps.x) / 2;
    let barLength = staffCnsts.STAFF_LENGTH - barX;
    let gap = barLength / 4;
    const startX = 2 * barX - staffCnsts.STAFF_LENGTH + gap;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(barX, 3 * staffCnsts.STAFF_GAP_SIZE.height);
    ctx.lineTo(barX, 7 * staffCnsts.STAFF_GAP_SIZE.height);
    ctx.stroke();

    // Loads the notes
    loadNoteImage(0, notes, startX, barLength / 6, gap, type);
}
*/

function loadGClefImage() {
    const props = staffCnsts.G_CLEF_IMG_PROPS;
    const image = new Image();
    image.src = props.src;
    image.addEventListener('load', () => {
        ctx.drawImage(image, props.x, props.y, props.width, props.height);
    });
}

function loadSharpImage(i, limit) {
    if (i == limit || i == 7) return;

    const props = staffCnsts.SHARP_IMG_PROPS;
    let y = props.gaps.y.reduce((ans, gap, idx) => {
        if (i < idx) return ans;

        return ans + gap;
    }, 0)
    const image = new Image();
    image.src = props.src;
    image.addEventListener('load', () => {
        ctx.drawImage(image, props.x + i * props.gaps.x, y, props.width, props.height);
        loadSharpImage(i + 1, limit);
    });
}

function loadFlatImage(i, limit) {
    if (i == limit || i == 7) return;

    const props = staffCnsts.FLAT_IMG_PROPS;
    let y = props.gaps.y.reduce((ans, gap, idx) => {
        if (i < idx) return ans;

        return ans + gap;
    }, 0)
    const image = new Image();
    image.src = props.src;
    image.addEventListener('load', () => {
        ctx.drawImage(image, props.x + i * props.gaps.x, y, props.width, props.height);
        loadFlatImage(i + 1, limit);
    });
}

function loadFourFourthsImage(num) {
    const props = staffCnsts.FOUR_FOURTHS_IMG_PROPS;
    const image = new Image();
    image.src = props.src;
    image.addEventListener('load', () => {
        const x = num == 0 ? props.x : props.x + (num + 1) * staffCnsts.SHARP_IMG_PROPS.gaps.x;
        ctx.drawImage(image, x, props.y, props.width, props.height);
    });
}

function loadNoteImage(i, notes, alteredNotes, x, NotesGap, barGap, type) {
    if (i == notes.length) return;

    let y = staffCnsts.C4_POS - notes[i].staffVal * staffCnsts.STAFF_GAP_SIZE.height / 2;
    const props = y > staffCnsts.B4_POS ? staffCnsts.QUARTER_UP_IMG_PROPS : staffCnsts.QUARTER_DOWN_IMG_PROPS
    if (y <= staffCnsts.B4_POS) {
        y += props.height - staffCnsts.STAFF_GAP_SIZE.height;
    }
    const altNoteProps = getAltNoteProps(notes, alteredNotes, i, type);
    if (altNoteProps) {
        const altImage = new Image();
        altImage.src = altNoteProps.src;
        altImage.addEventListener('load', () => {
            const altX = x - altNoteProps.width - props.width / 1.5;
            const altY = altNoteProps.c4Pos - notes[i].staffVal*staffCnsts.STAFF_GAP_SIZE.height/2;
            ctx.drawImage(altImage, altX, altY, altNoteProps.width, altNoteProps.height);
            loadQuarterImage(i, notes, alteredNotes, x, y, NotesGap, barGap, type, props);
        });
    } else {
        loadQuarterImage(i, notes, alteredNotes, x, y, NotesGap, barGap, type, props);
    }
}

function loadQuarterImage(i, notes, alteredNotes, x, y, NotesGap, barGap, type, props) {
    const image = new Image();
    image.src = props.src;
    image.addEventListener('load', () => {
        ctx.drawImage(image, x - props.width / 2, y, props.width, props.height);
        x = (i + 1) % 4 == 0 ? x + 2 * barGap : x + NotesGap;
        loadNoteImage(i + 1, notes, alteredNotes, x, NotesGap, barGap, type);
    });
}

function getAltNoteProps(notes, alteredNotes, i, type) {
    const altered = alteredNotes.length > 0 && notes[i] != alteredNotes[i];
    if (type != 'chord' && !altered) return null;

    const note = notes[i];
    const prevNote = notes[i-1];
    switch (note.type) {
        case 'natural':
            if (prevNote && prevNote.type != 'natural' && note.staffVal == prevNote.staffVal || type == 'scale') {
                return staffCnsts.NATURAL_IMG_PROPS;
            }

            return null;
        case 'sharp':
            return staffCnsts.SHARP_IMG_PROPS;
        case 'flat':
            return staffCnsts.FLAT_IMG_PROPS;
        case 'doubleSharp':
            return staffCnsts.DOUBLE_SHARP_IMG_PROPS;
        case 'doubleFlat':
            return staffCnsts.DOUBLE_FLAT_IMG_PROPS;
    }

    return null;
}

function getAltsDetails(notes) {
    let type = 'sharp';
    let num = notes.reduce((num, note, idx) => {
        if (note.label.indexOf('♯') != -1 && idx != notes.length - 1) {
            return num + 1;
        }

        return num;
    }, 0)
    if (num == 0) {
        type = 'flat';
        num = notes.reduce((num, note, idx) => {
            if (note.label.indexOf('♭') != -1 && idx != notes.length - 1) {
                return num + 1;
            }

            return num;
        }, 0)
    }

    return { num, type };
}

export default {
    getCanvas,
    getContext,
    strokeStaffBody,
    strokeStaffNotes
}