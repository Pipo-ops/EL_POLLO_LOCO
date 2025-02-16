let canvas;
let ctx;
let gameStarted = false;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    showStartScreen(); // Zeige das Startbild zuerst
}

function showStartScreen() {
    let startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    
    startImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    if (!gameStarted) { // Nur starten, wenn es noch nicht läuft
        gameStarted = true;
        world = new World(canvas, keyboard); // Keyboard-Objekt mitgeben!
    }
}

// Event-Listener für den Button
document.addEventListener("DOMContentLoaded", function () {
    let playButton = document.querySelector('.play-btn');
    playButton.addEventListener("click", startGame);
});

window.addEventListener('keydown', (e) => { // function um bei drücken der taste auf true zu setzen
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => { // function um bei drücken der taste auf false zu setzen
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});

