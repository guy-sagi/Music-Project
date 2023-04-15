import CofElement from "../Elements/CofElement.js";
import Project from "../Project.js";
import { cofCnsts } from "../modules/Constants.js";

cofCnsts.initialize();

const canvasDiv = document.querySelector('.cof-canvas');
const canvas = document.getElementById('cofCanvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the div containing the canvas
canvasDiv.style.width = cofCnsts.COF_SIDE_LENGTH + 'px';
canvasDiv.style.height = cofCnsts.COF_SIDE_LENGTH + 'px';

// Set the width and height of the canvas element
canvas.width = cofCnsts.COF_SIDE_LENGTH;
canvas.height = cofCnsts.COF_SIDE_LENGTH;

const paths = [];

function setupElements() {
    let elements = [];
    const outerLabels = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
    const innerLabels = ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'];
    for (let i = 0; i < 12; i++) {
        let outerPos = {
            r1: cofCnsts.R1,
            r2: cofCnsts.R2,
            theta1: -7 / 12 * Math.PI + 1 / 6 * Math.PI * i,
            theta2: -5 / 12 * Math.PI + 1 / 6 * Math.PI * i
        }
        let innerPos = {
            r1: cofCnsts.R2,
            r2: cofCnsts.R3,
            theta1: -7 / 12 * Math.PI + 1 / 6 * Math.PI * i,
            theta2: -5 / 12 * Math.PI + 1 / 6 * Math.PI * i
        }

        elements.push(new CofElement(outerLabels[i], i * 7 % 12, outerPos, { color: cofCnsts.DEFAULT_COLOR, fontSize: cofCnsts.COF_SIDE_LENGTH / 20 }));
        elements.push(new CofElement(innerLabels[i], (i * 7 + 9) % 12, innerPos, { color: cofCnsts.DEFAULT_COLOR, fontSize: 3 * cofCnsts.COF_SIDE_LENGTH / 100 }));
    }

    elements.sort((a, b) => {
        return a.id - b.id;
    });
    
    elements.forEach((element) => Project.addCofElement(element));
}

function addElement(element) {
    const pos = element.pos;
    const path = createPath(pos);
    
    ctx.stroke(path);
    ctx.fillStyle = element.props.color; 
    ctx.fill(path);
    ctx.font = element.props.fontSize + "pt " + element.props.fontFamily;
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.fillText(element.label, cofCnsts.CENTER.x + pos.rAvg * pos.cosAvg, cofCnsts.CENTER.y + pos.rAvg * pos.sinAvg + element.props.fontSize / 2);
    return path;
}

function createPath(pos) {
    //Initialize
    const path = new Path2D();
    path.arc(cofCnsts.CENTER.x, cofCnsts.CENTER.y, pos.r1, pos.theta1, pos.theta2); // Top curve
    path.lineTo(cofCnsts.CENTER.x + pos.r2*pos.cosTheta2, cofCnsts.CENTER.y + pos.r2*pos.sinTheta2); // Right  side
    path.arc(cofCnsts.CENTER.x, cofCnsts.CENTER.y, pos.r2, pos.theta2, pos.theta1, true); // Bottom curve
    path.lineTo(cofCnsts.CENTER.x + pos.r2*pos.cosTheta1, cofCnsts.CENTER.y + pos.r2*pos.sinTheta1); // Left side
    path.closePath();
    return path;
}

function strokeCOF() {
    Project.getCofElements().forEach((element) => {
        paths.push(addElement(element));
    });
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

// Getters
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
    strokeCOF,
    getMousePos,
    getCanvas,
    getContext,
    getPaths
}