import CofCanvasUtils from "./Canvas/CofCanvasUtils.js";
import PianoCanvasUtils from "./Canvas/PianoCanvasUtils.js";
import MusicUtils from "./utils/MusicUtils.js";
import AudioUtils from "./utils/AudioUtils.js";
import CNSTS from "./modules/Constants.js"

const cofCnsts = CNSTS.cofCnsts;
const pianoCnsts = CNSTS.pianoCnsts;
const staffCnsts = CNSTS.staffCnsts;

//Setup initial data of the project
cofCnsts.initialize();
staffCnsts.initialize();

const cofElements = [];
const pianoElements = [];

let hoveredKeyElement = null;
let selectedCofElement = null;
let selectedKeyElement = null;

function addCofElement(element) {
    cofElements.push(element);
}

function addPianoElement(element) {
    pianoElements.push(element);
}

function getCofElements() {
    return cofElements;
}

function getPianoElements() {
    return pianoElements;
}

function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

function isPointInAnotherPath(currentPathIdx, x, y) {
    let elements = getPianoElements();
    let pianoCtx = PianoCanvasUtils.getContext();
    let pianoPaths = PianoCanvasUtils.getPaths();

    for (let i in elements) {
        if (currentPathIdx != i && pianoCtx.isPointInPath(pianoPaths[i], x, y)) {
            return true;
        }
    }

    return false;
}

function cofOnClick(element, isInsideElement) {
    if (isInsideElement) {
        if (selectedCofElement && selectedCofElement != element) {
            selectedCofElement.props.color = cofCnsts.DEFAULT_COLOR;
        }
        element.props.color = selectedCofElement != element ? cofCnsts.CLICKED_COLOR : cofCnsts.DEFAULT_COLOR;
        selectedCofElement = selectedCofElement != element ? element : null;
    } else {
        element.props.color = cofCnsts.DEFAULT_COLOR;
    }

    CofCanvasUtils.strokeCOF();
}

function cofOnMouseMove(element, isInsideElement) {
    if (element != selectedCofElement) {
        if (isInsideElement) {
            element.props.color = cofCnsts.HOVER_COLOR;
        } else if (element.props.color != cofCnsts.DEFAULT_COLOR) {
            element.props.color = cofCnsts.DEFAULT_COLOR;
        }
    } else {
        if (isInsideElement) {
            element.props.color = cofCnsts.HOVER_CLICKED_COLOR;
        } else if (element.props.color != cofCnsts.DEFAULT_COLOR) {
            element.props.color = cofCnsts.CLICKED_COLOR;
        }
    }

    CofCanvasUtils.strokeCOF();
}

function pianoOnKeyClick(element, isInsideElement) {
    if (isInsideElement) {
        element.props.color = element.type == 'white' ? pianoCnsts.CLICKED_WHITEKEY_COLOR : pianoCnsts.CLICKED_BLACKKEY_COLOR;
        if (selectedKeyElement && selectedKeyElement != element) {
            selectedKeyElement.props.color = selectedKeyElement.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
        }
        selectedKeyElement = element;
        if (selectedKeyElement) {
            let note = selectedKeyElement.notes[0];
            AudioUtils.playSound(note);
            note.sound.addEventListener('ended', (event) => {
                element.props.color = element.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
                selectedKeyElement = null;
                PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
            });
        }
    } else {
        element.props.color = element.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
    }

    PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
}

function pianoOnMouseMove(element, isInsideElement) {
    if (element != selectedKeyElement) {
        if (isInsideElement) {
            if (hoveredKeyElement && hoveredKeyElement != element) {
                if (hoveredKeyElement == selectedKeyElement) {
                    hoveredKeyElement.props.color = hoveredKeyElement.type == 'white' ? pianoCnsts.CLICKED_WHITEKEY_COLOR : pianoCnsts.CLICKED_BLACKKEY_COLOR;
                } else {
                    hoveredKeyElement.props.color = hoveredKeyElement.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
                }
            }
            hoveredKeyElement = element;
            element.props.color = element.type == 'white' ? pianoCnsts.HOVER_WHITEKEY_COLOR : pianoCnsts.HOVER_BLACKKEY_COLOR;
        } else {
            element.props.color = element.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
        }
    } else {
        if (hoveredKeyElement && hoveredKeyElement != element) {
            hoveredKeyElement.props.color = hoveredKeyElement.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
        }
        hoveredKeyElement = element;
        element.props.color = element.type == 'white' ? pianoCnsts.CLICKED_WHITEKEY_COLOR : pianoCnsts.CLICKED_BLACKKEY_COLOR;
    }

    PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);
}

function getNoteByLabel(label) {
    const notes = MusicUtils.getNotes();
    for (let i in notes){
        if (notes[i].label == label){
            return notes[i];
        }
    }

    return null;
}

function getNotesByValue(value) {
    const notes = [];
    const allNotes = MusicUtils.getNotes();
    for (let i in allNotes){
        if (allNotes[i].value == value){
            notes.push(allNotes[i]);
        }
    }

    return notes;
}

function getSelectedNote() {
    return selectedCofElement;
}

function getPianoElementByValue(elementVal) {
    for (let i in pianoElements) {
        if (pianoElements[i].value == elementVal){
            return pianoElements[i];
        }
    }

    return null;
}

export default {
    addCofElement,
    addPianoElement,
    getCofElements,
    getPianoElements,
    cofOnClick,
    cofOnMouseMove,
    pianoOnKeyClick,
    pianoOnMouseMove,
    getMousePos,
    isPointInAnotherPath,
    getPianoElementByValue,
    getSelectedNote,
    getNoteByLabel,
    getNotesByValue
}