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

function showWinScreen() {
    let canvasContainer = document.getElementById('canvas-container'); // Container für das Canvas
    let winOverlay = document.createElement('div');
    winOverlay.id = 'win-screen';
    winOverlay.style.position = 'absolute';
    winOverlay.style.top = '0';
    winOverlay.style.left = '0';
    winOverlay.style.width = '100%';
    winOverlay.style.height = '97%';
    winOverlay.style.display = 'flex';
    winOverlay.style.justifyContent = 'center';
    winOverlay.style.alignItems = 'center';
    winOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    winOverlay.style.zIndex = '10';

    let winImage = new Image();
    winImage.src = 'img/9_intro_outro_screens/win/win_2.png';
    winImage.style.width = '10%'; // Start klein
    winImage.style.transition = 'transform 1s ease-in-out'; // Smooth Wachstum

    winOverlay.appendChild(winImage);
    canvasContainer.appendChild(winOverlay);

    setTimeout(() => {
        winImage.style.transform = 'scale(10)'; // Wächst auf volle Canvas-Größe
    }, 100);

    stopGame(); // Spiel anhalten
    changePlayButtonToRestart(); // Button ändern
}

function showGameOverScreen() {
    let canvas = document.getElementById('canvas');
    let canvasContainer = document.getElementById('canvas-container');

    let gameOverOverlay = document.createElement('div');
    gameOverOverlay.id = 'game-over-screen';
    gameOverOverlay.style.position = 'absolute';
    gameOverOverlay.style.top = '0'; 
    gameOverOverlay.style.left = '0';
    gameOverOverlay.style.width = '100%'; 
    gameOverOverlay.style.height = '97%'; 
    gameOverOverlay.style.display = 'flex';
    gameOverOverlay.style.justifyContent = 'center';
    gameOverOverlay.style.alignItems = 'center';
    gameOverOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverOverlay.style.zIndex = '10';

    let gameOverImage = new Image();
    gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over!.png';
    gameOverImage.style.width = '10%';
    gameOverImage.style.transition = 'width 1s ease-in-out, height 1s ease-in-out';

    gameOverOverlay.appendChild(gameOverImage);
    canvasContainer.appendChild(gameOverOverlay);

    setTimeout(() => {
        gameOverImage.style.width = canvas.width + 'px';
        gameOverImage.style.height = canvas.height + 'px';
    }, 100);

    stopGame();
    changePlayButtonToRestart();
}

function stopGame() {
    if (world) {
        clearInterval(world.animationInterval); // Stoppe alle Animationen
        world.character.speed = 0; // Charakter bleibt stehen
        world.keyboard = {}; // Deaktiviert Steuerung

    }
}

function changePlayButtonToRestart() {
    let playButton = document.querySelector('.play-btn');
    playButton.innerText = "RESTART GAME"; // Ändert den Button-Text
    playButton.onclick = restartGame; // Funktion für Neustart setzen

    // Button kurz verstecken und wieder anzeigen, um Hover-Status zu resetten
    playButton.style.display = "none";
    setTimeout(() => {
        playButton.style.display = "inline-block";
    }, 50); // 50ms Verzögerung für sanfte Aktualisierung
}


function restartGame() {
    location.reload(); // Seite neu laden, um das Spiel zurückzusetzen
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

