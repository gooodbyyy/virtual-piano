function toggleFullscreen() {
    let elem = document.documentElement;
    elem.requestFullscreen =
        elem.requestFullscreen ||
        elem.mozRequestFullscreen ||
        elem.msRequestFullscreen ||
        elem.webkitRequestFullscreen;

    if (!document.fullscreenElement) {
        elem
            .requestFullscreen()
            .then({})
            .catch((err) => {
                alert(
                    `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                );
            });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function playAudio(note) {
    const audio = new Audio();
    audio.src = `./assets/audio/${note}.mp3`;
    audio.currentTime = 0;
    audio.play();
}
let keyCodes = {
    68: 'c',
    70: 'd',
    71: 'e',
    72: 'f',
    74: 'g',
    75: 'a',
    76: 'b',
    82: 'c♯',
    84: 'd♯',
    85: 'f♯',
    73: 'g♯',
    79: 'a♯'
}

function toggleActiveKey(e) {
    e.classList.toggle('piano-key-active');
}
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');


function keyboardInput(x) {
    let targetKey = document.querySelector(`div[data-note="${keyCodes[event.which]}"]`)
    console.log(targetKey)
    if (Object.keys(keyCodes).includes(`${event.which}`) && event.repeat == 0) {
        if (event.type === 'keydown') {
            console.log(event.repeat)
            playAudio(keyCodes[event.which]);
            toggleActiveKey(targetKey);
        }
        if (event.type === 'keyup') {
            console.log()
            toggleActiveKey(targetKey);
        }
    }
}

function mouseClick(x) {
    let note = event.target.dataset.note;
    if (event.type === 'mousedown') {
        playAudio(note);
        toggleActiveKey(event.target);
    }
    if (event.type === 'mouseup' && event.target.classList.contains('piano-key-active') === true) {
        toggleActiveKey(event.target);
    }
}
let painoIsOn = false;

function mouseMoves(x) {
    // console.log('Leave to', event.target);
    // console.log('PLAY', event.buttons == 1)
    // console.log('Leave from', event.relatedTarget);
    let note = event.target.dataset.note;
    if (event.buttons == 1 && m === true) {
        playAudio(note);
        toggleActiveKey(event.target);
    }
}

pianoКeys.forEach((e) => {
    e.onmouseover = function() {
        mouseMoves(this);
    };
    e.onmouseout = function() {
        if (m === true) { toggleActiveKey(event.target) }
    };
});

function switchKeys() {
    console.log(event.target)
    if (!event.target.classList.contains('btn-active')) {
        document.querySelectorAll('.btn').forEach(e => e.classList.toggle("btn-active"))
        pianoКeys.forEach(e => e.classList.toggle("piano-key-letter"))
    }
}
document.querySelectorAll(".btn-container").forEach(btn => btn.addEventListener("click", function() {
    switchKeys(this);
}))

document.querySelectorAll(".piano-key").forEach(function(e) {
    e.addEventListener("mousedown", function() {
        m = true;
        mouseClick(this);
    });
    e.addEventListener("mouseup", function() {
        mouseClick(this);
        m = false;
    })
});
window.addEventListener("keydown", () => {
    keyboardInput(this);
});
window.addEventListener("keyup", () => {
    keyboardInput(this);
});
window.addEventListener("mouseup", function() {
    m = false;
})