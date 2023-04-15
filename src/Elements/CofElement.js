import Project from "../Project.js";

class CofElement {
    label;
    id;
    pos = {
        r1: 0,
        r2: 0,
        rAvg: 0,
        theta1: 0,
        theta2: 0,
        cosTheta1: 0,
        cosTheta2: 0,
        sinTheta1: 0,
        sinTheta2: 0,
        cosAvg: 0,
        sinAvg: 0
    };
    props = {
        color: '',
        fontFamily: 'Arial',
        fontSize: ''
    };
    note;

    constructor(label, id, pos, props) {
        this.label = label;
        this.id = id;
        this.pos = pos;
        this.pos.rAvg = (pos.r1 + pos.r2) / 2;
        this.pos.cosTheta1 = Math.cos(this.pos.theta1);
        this.pos.cosTheta2 = Math.cos(this.pos.theta2);
        this.pos.sinTheta1 = Math.sin(this.pos.theta1);
        this.pos.sinTheta2 = Math.sin(this.pos.theta2);
        this.pos.cosAvg = Math.cos((this.pos.theta1 + this.pos.theta2) / 2);
        this.pos.sinAvg = Math.sin((this.pos.theta1 + this.pos.theta2) / 2);
        this.props.color = props.color;
        this.props.fontSize = props.fontSize;
        this.note = Project.getNoteByLabel(label);
    }
}

export default CofElement;