import PianoElement from "../Elements/PianoElement.js";
import Project from "../Project.js";
import { pianoCnsts } from "../modules/Constants.js";

const canvasDiv = document.querySelector('.piano-canvas');
const canvas = document.getElementById('pianoCanvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the div containing the canvas
canvasDiv.style.width = pianoCnsts.PIANO_WIDTH + 'px';
canvasDiv.style.height = pianoCnsts.PIANO_HEIGHT + 'px';

// Set the width and height of the canvas element
canvas.width = pianoCnsts.PIANO_WIDTH;
canvas.height = pianoCnsts.PIANO_HEIGHT;

const blackKeysIntervals = [1, 3.6, 7, 9.3, 11.6, 15, 17.6, 21, 23.3, 25.6];
const whiteKeysElements = [];
const blackKeysElements = [];
const paths = [];

function setupElements() {
    /*const whiteKeysLabels = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeysLabels = ['C♯', 'D♯', 'F♯', 'G♯', 'A♯'];*/
    const noBlackKeysNextTo = [2, 6, 9, 13];
    let id = 0;
    let numOfBlackKeys = 0;
    for (let numOfWhiteKeys = 0; numOfWhiteKeys < 15; numOfWhiteKeys++) {
        let whiteKeyPos = {
            x: pianoCnsts.PIANO_WIDTH / 20 + numOfWhiteKeys * 3 * pianoCnsts.PIANO_WIDTH / 50,
            y: pianoCnsts.PIANO_HEIGHT / 4,
            width: 3 * pianoCnsts.PIANO_WIDTH / 50,
            height: 5 * pianoCnsts.PIANO_HEIGHT / 8
        }
        let blackKeyPos = {
            x: pianoCnsts.PIANO_WIDTH / 20 + blackKeysIntervals[numOfBlackKeys] * 3 * pianoCnsts.PIANO_WIDTH / 100,
            y: pianoCnsts.PIANO_HEIGHT / 4,
            width: pianoCnsts.PIANO_WIDTH / 25,
            height: 2 * pianoCnsts.PIANO_HEIGHT / 5
        }

        whiteKeysElements.push(new PianoElement(/*whiteKeysLabels[numOfWhiteKeys % whiteKeysLabels.length], */id++, "white", whiteKeyPos, { color: pianoCnsts.DEFAULT_WHITEKEY_COLOR, fontSize: 20, border: [] }));
        if (numOfBlackKeys < 10 && noBlackKeysNextTo.indexOf(numOfWhiteKeys) == -1) {
            blackKeysElements.push(new PianoElement(/*blackKeysLabels[numOfBlackKeys % blackKeysLabels.length], */id++, "black", blackKeyPos, { color: pianoCnsts.DEFAULT_BLACKKEY_COLOR, fontSize: 12, border: [0, 0, 5, 5] }));
            numOfBlackKeys++;
        }
    }

    whiteKeysElements.sort((a, b) => {
        return a.id - b.id;
    });

    blackKeysElements.sort((a, b) => {
        return a.id - b.id;
    });

    whiteKeysElements.concat(blackKeysElements).forEach((element) => {
        Project.addPianoElement(element);
    });
}

function strokePiano(title) {
    // Setup the Piano body
    strokePianoBody();

    addHeaderText(title);

    // Add the keys
    Project.getPianoElements().forEach((element) => {
        if (element.type == 'white') {
            element.path = strokeWhiteKey(element);
        } else {
            element.path = strokeBlackKey(element);
        }
    });
}

function strokePianoBody() {
    ctx.beginPath();
    ctx.moveTo(pianoCnsts.PIANO_WIDTH / 40, pianoCnsts.PIANO_HEIGHT / 20);
    ctx.roundRect(pianoCnsts.PIANO_WIDTH / 40, pianoCnsts.PIANO_HEIGHT / 20, 19 * pianoCnsts.PIANO_WIDTH / 20, 9 * pianoCnsts.PIANO_HEIGHT / 10, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.roundRect(pianoCnsts.PIANO_WIDTH / 20, pianoCnsts.PIANO_HEIGHT / 4, 9 * pianoCnsts.PIANO_WIDTH / 10, 5 * pianoCnsts.PIANO_HEIGHT / 8, 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function addHeaderText(text) {
    ctx.font = "20pt Arial";
    ctx.fillStyle = 'pink';
    ctx.textAlign = "center";
    ctx.fillText(text, 200, 37.5);
}

function strokeWhiteKey(element) {
    let pos = element.pos;

    ctx.lineWidth = 2;
    let path = new Path2D();
    ctx.moveTo(pos.x, pos.y);
    path.lineTo(pos.x + pos.width, pos.y);
    path.lineTo(pos.x + pos.width, pos.y + pos.height);
    path.lineTo(pos.x, pos.y + pos.height);
    path.lineTo(pos.x, pos.y);
    path.closePath();
    ctx.stroke(path);
    ctx.fillStyle = element.props.color;
    ctx.fill(path);
    
    paths.push(path);
}

function strokeBlackKey(element) {
    let pos = element.pos;
    let path = new Path2D();
    ctx.moveTo(pos.x, pos.y);
    path.roundRect(pos.x, pos.y, pos.width, pos.height, element.props.border);
    path.closePath();
    ctx.stroke(path);
    ctx.fillStyle = element.props.color;
    ctx.fill(path);

    paths.push(path);
}

function getCanvas() {
    return canvas;
}

function getContext() {
    return ctx;
}

function getPaths() {
    return paths;
}

export default {
    setupElements,
    strokePiano,
    getCanvas,
    getContext,
    getPaths
}