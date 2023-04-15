/*let backwards = false;*/
function playSound(note) {
    let snd = note.sound;
    
    // On video playing toggle values
    snd.onplaying = function () {
        snd.isPlaying = true;
    };

    // On video pause toggle values
    snd.onpause = function () {
        snd.isPlaying = false;
    };

    snd.play();

    /*return snd;*/
}

// Pause video function
function pauseSound(note) {
    if (!note.sound.paused && note.isPlaying) {
        note.sound.pause();
    }
}

export default { playSound, pauseSound }