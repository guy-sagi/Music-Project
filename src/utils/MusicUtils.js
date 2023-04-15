import Project from "../Project.js";
import { pianoCnsts, staffCnsts } from "../modules/Constants.js";
import InitialData from "../modules/InitialData.js";
import Chord from "../Elements/Chord.js";
import Scale from "../Elements/Scale.js";
import AudioUtils from "./AudioUtils.js";
import PianoCanvasUtils from "../Canvas/PianoCanvasUtils.js";
import StaffCanvasUtils from "../Canvas/StaffCanvasUtils.js";
import Note from "../Elements/Note.js";

const notes = [];
const chords = [];
const scales = [];

function initNotes() {
  for (let i = 0; i < 2; i++)
    InitialData.notesData.forEach((details) => {
      details.notes.forEach((note) => {
        notes.push(new Note(note.label, note.value + i * 12, note.staffVal + i * 7, details.type, i));
      });
    });

  notes.sort((a, b) => {
    if (a.value - b.value == 0) return a.label.charCodeAt(0) - b.label.charCodeAt(0);

    return a.value - b.value;
  })
}

function initChords() {
  InitialData.chordsData.forEach((details) => {
    chords.push(new Chord(details, pianoCnsts.TIME_INTERVAL));
  });
}

function initScales() {
  InitialData.scalesData.forEach((details) => {
    scales.push(new Scale(details, pianoCnsts.TIME_INTERVAL));
  })
}

function getNotes() {
  return notes;
}

function getChords() {
  return chords;
}

function getScales() {
  return scales;
}

function playPianoNotes(selectedNote, obj) {
  const type = obj instanceof Scale ? 'scale' : 'chord';
  const title = `${selectedNote.label} ${obj.label} ${type}`;
  const alteredNotes = !obj.altered ? [] : getNotesByIntervals(selectedNote, obj.alteredObj.intervals, obj.alteredObj.staffIntervals).notes;
  let { notes, pianoElements } = getNotesByIntervals(selectedNote, obj.intervals, obj.staffIntervals);
  StaffCanvasUtils.strokeStaffNotes(notes, obj, type, alteredNotes);

  playNote(pianoElements[0], { notes, pianoElements }, obj.timeInterval, 0, title);
}

/*
function OBSOLETE_playPianoNotes(selectedNote, { intervals, staffIntervals, timeInterval }, title, type) {
  let { notes, pianoElements } = getNotesByIntervals(selectedNote, { intervals, staffIntervals });
  StaffCanvasUtils.strokeStaffNotes(notes, type);

  playNote(pianoElements[0], { notes, pianoElements }, timeInterval, 0, `${selectedNote.label} ${title}`);
}
*/

function getNotesByIntervals(rootNote, intervals, staffIntervals) {
  const notes = [ rootNote ];
  const pianoElements = [ Project.getPianoElementByValue(rootNote.value) ];
  let value = rootNote.value;
  for (let i = 0; i < intervals.length; i++) {
    value += intervals[i];
    let pianoElement = Project.getPianoElementByValue(value);
    notes.push(getNextNote(notes[i], pianoElement.notes, staffIntervals[i]))
    pianoElements.push(pianoElement);
  }

  return { notes, pianoElements };
}

/*
function OBSOLETE_getNotesByIntervals(rootNote, { intervals, staffIntervals }) {
  const notes = [rootNote];
  const pianoElements = [Project.getPianoElementByValue(rootNote.value)];
  let value = rootNote.value;
  for (let i = 0; i < intervals.length; i++) {
    value += intervals[i];
    let pianoElement = Project.getPianoElementByValue(value);
    notes.push(getNextNote(notes[i], pianoElement.notes, staffIntervals[i]))
    pianoElements.push(pianoElement);
  }

  return { notes, pianoElements };
}
*/

function getNextNote(prevNote, pianoElementNotes, staffInterval) {
  for (let i in pianoElementNotes) {
    let note = pianoElementNotes[i];
    if (prevNote.staffVal + staffInterval == note.staffVal) {
      return note;
    }
  }

  return null;
}

function playNote(selectedKeyElement, { notes, pianoElements }, timeInterval, idx, title) {
  let element = pianoElements[idx];
  element.props.color = element.type == 'white' ? pianoCnsts.CLICKED_WHITEKEY_COLOR : pianoCnsts.CLICKED_BLACKKEY_COLOR;
  if (selectedKeyElement && selectedKeyElement != element) {
    selectedKeyElement.props.color = selectedKeyElement.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
  }
  if (notes[idx]) AudioUtils.pauseSound(notes[idx]);
  selectedKeyElement = element;
  if (selectedKeyElement) {
    let note = notes[idx];
    AudioUtils.playSound(note);
    PianoCanvasUtils.strokePiano(title);
    setTimeout(() => {
      selectedKeyElement.props.color = element.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
      if (notes.length > idx + 1) {
        playNote(selectedKeyElement, { notes, pianoElements }, timeInterval, idx + 1, title);
      } else {
        //Reset the Piano canvas
        selectedKeyElement.props.color = selectedKeyElement.type == 'white' ? pianoCnsts.DEFAULT_WHITEKEY_COLOR : pianoCnsts.DEFAULT_BLACKKEY_COLOR;
        selectedKeyElement = null
        PianoCanvasUtils.strokePiano(pianoCnsts.TITLE);

        //Reset the Staff canvas
        const staffCtx = StaffCanvasUtils.getContext();
        staffCtx.clearRect(0, 0, staffCnsts.STAFF_SIZE.width, staffCnsts.STAFF_SIZE.height);
        StaffCanvasUtils.strokeStaffBody();
      }
    }, timeInterval);
  }
}

export default { initNotes, initChords, initScales, getNotes, getChords, getScales, playPianoNotes }