import Project from "./src/Project.js";
import CofCanvasUtils from "./src/Canvas/CofCanvasUtils.js";
import PianoCanvasUtils from "./src/Canvas/PianoCanvasUtils.js";
import StaffCanvasUtils from "./src/Canvas/StaffCanvasUtils.js";
import MusicUtils from "./src/utils/MusicUtils.js";
import { cofCnsts, pianoCnsts, staffCnsts } from "./src/modules/Constants.js"

// Setup the width of the main component according to the widest canvas element
const main = document.querySelector('main');
main.style.width = getMaxWidth();

function getMaxWidth() {
    const cofWidth = cofCnsts.COF_SIDE_LENGTH;
    const pianoWidth = pianoCnsts.PIANO_WIDTH;
    const staffWidth = staffCnsts.STAFF_SIZE.width;

    if (cofWidth < pianoWidth) {
        return pianoWidth < staffWidth ? staffWidth : pianoWidth;
    }

    return cofWidth < staffWidth ? staffWidth : cofWidth;
}

// Setup initial data of the project
cofCnsts.initialize();
staffCnsts.initialize();

MusicUtils.initNotes();
MusicUtils.initChords();
MusicUtils.initScales();

// Circle of Fifths canvas initialize
CofCanvasUtils.setupElements();
CofCanvasUtils.strokeCOF();
const cofCanvas = CofCanvasUtils.getCanvas();
const cofCtx = CofCanvasUtils.getContext();
const cofPaths = CofCanvasUtils.getPaths();

// Piano canvas initialize
PianoCanvasUtils.setupElements();
PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
const pianoCanvas = PianoCanvasUtils.getCanvas();
const pianoCtx = PianoCanvasUtils.getContext();
const pianoPaths = PianoCanvasUtils.getPaths();

// Staff canvas initialize
StaffCanvasUtils.strokeStaffBody();

// Toggle dropdown lists on click
const dropdownContainers = document.querySelectorAll('.dropdown-container')
dropdownContainers.forEach((container) => {
    container.style.display = 'none';
});
const dropdownButtons = document.querySelectorAll('.dropdown-btn');
dropdownButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        if (dropdownContainers[idx].style.display == 'none') {
            dropdownContainers[idx].style.display = 'block';
        } else {
            dropdownContainers[idx].style.display = 'none';
        }
    })
});

// Add Scales to the dropdown menu
MusicUtils.getScales().forEach((scale) => {
    const btn = document.createElement("a");
    btn.href = `#${scale.label}`;
    btn.innerHTML = `${scale.label} Scale`
    dropdownContainers[0].appendChild(btn);
    btn.addEventListener("click", () => {
        let selectedNote = Project.getSelectedNote();
        if (!selectedNote) {
            alert("Please select a note!");
            return false;
        }

        setTimeout(() => {
            scale.playScale(selectedNote.note);
        }, 500);
    });
});

// Add Chords to the dropdown menu
MusicUtils.getChords().forEach((chord) => {
    const btn = document.createElement("a");
    btn.href = `#${chord.label}`;
    btn.innerHTML = `${chord.label} Chord`
    dropdownContainers[1].appendChild(btn);
    btn.addEventListener("click", () => {
        let selectedNote = Project.getSelectedNote();
        if (!selectedNote) {
            alert("Please select a note!");
            return false;
        }
        setTimeout(() => {
            chord.playChord(selectedNote.note);
        }, 500);
    });
});

// Circle of Fifths canvas on click event
cofCanvas.addEventListener('click', function (event) {
    let mousePos = Project.getMousePos(cofCanvas, event);
    let elements = Project.getCofElements();

    for (let i in elements) {
        let isInsideElement = cofCtx.isPointInPath(cofPaths[i], mousePos.x, mousePos.y);

        Project.cofOnClick(elements[i], isInsideElement);
    }
}, false);

// Circle of Fifths canvas on mouse move event
cofCanvas.onmousemove = (event) => {
    let mousePos = Project.getMousePos(cofCanvas, event);
    let elements = Project.getCofElements();

    for (let i in elements) {
        let isInsideElement = cofCtx.isPointInPath(cofPaths[i], mousePos.x, mousePos.y);

        Project.cofOnMouseMove(elements[i], isInsideElement);
    }
}

// Piano canvas on click event
pianoCanvas.addEventListener('click', function (event) {
    let mousePos = Project.getMousePos(pianoCanvas, event);
    let elements = Project.getPianoElements();

    for (let i in elements) {
        let isInsideElement = pianoCtx.isPointInPath(pianoPaths[i], mousePos.x, mousePos.y);
        let isInsideAnotherElement = false;
        if (isInsideElement && elements[i].type == 'white') {
            isInsideAnotherElement = Project.isPointInAnotherPath(i, mousePos.x, mousePos.y);
        }

        Project.pianoOnKeyClick(elements[i], isInsideElement && !isInsideAnotherElement);
    }

    PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
}, false);

// Piano canvas on mouse move
pianoCanvas.onmousemove = (event) => {
    let mousePos = Project.getMousePos(pianoCanvas, event);
    let elements = Project.getPianoElements();

    for (let i in elements) {
        let isInsideElement = pianoCtx.isPointInPath(pianoPaths[i], mousePos.x, mousePos.y);
        let isInsideAnotherElement = false;
        if (isInsideElement && elements[i].type == 'white') {
            isInsideAnotherElement = Project.isPointInAnotherPath(i, mousePos.x, mousePos.y);
        }

        Project.pianoOnMouseMove(elements[i], isInsideElement);
    }

    PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
}