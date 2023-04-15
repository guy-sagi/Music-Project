class Note {
    label;
    value;
    type;
    sound;
    staffVal;
    octave;
    isPlaying = false;

    constructor(label, value, staffVal, type, octave) {
        this.label = label;
        this.value = value;
        this.staffVal = staffVal;
        this.type = type;
        this.octave = octave;
        this.sound = new Audio(`./Sounds/${value}.mp3`);
    }
}

export default Note;