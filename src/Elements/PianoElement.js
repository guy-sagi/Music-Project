import Note from "./Note.js";
import MusicUtils from "../utils/MusicUtils.js";
import Project from "../Project.js";

class PianoElement {
    /*label;*/
    value;
    type;
    selected = false;
    path;
    notes = [];
    pos = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    props = {
        color: '',
        fontFamily: 'Arial',
        fontSize: '',
        border: []
    }

    constructor(/*label, */value, type, pos, props) {
        /*this.label = label;*/
        this.value = value;
        this.type = type;
        this.notes = Project.getNotesByValue(value);
        this.notes.sort((a, b) => {
            if (a.label.length == b.label.length){
                return a.staffVal - b.staffVal;
            }

            return a.label.length - b.label.length;
        })
        this.pos = pos;
        this.props.color = props.color;
        this.props.fontSize = props.fontSize;
        this.props.border = props.border;
    }
}

export default PianoElement;