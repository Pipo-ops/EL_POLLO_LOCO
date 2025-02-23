let canvas;
let ctx;
let gameStarted = false;
let world;
let keyboard = new Keyboard();
let winSound = new Audio('audio/backgound_musik/177304__lenguaverde__jarabe-tapatio-mariachi (1).mp3');
let gameOverSound = new Audio('audio/backgound_musik/76376__deleted_user_877451__game_over.wav');


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
        keyboard = new Keyboard();
        world = new World(canvas, keyboard); // Welt mit Keyboard verbinden
        world.run();

        // Swap-Button verstecken, wenn das Spiel startet
        let swapButton = document.getElementById("swap-controls-btn");
        if (swapButton) {
            swapButton.style.display = "none";
        }

        requestAnimationFrame(() => world.draw()); // Zeichne das Spiel erst jetzt
    }
}


function showWinScreen() {
    stopGame();
    stopAllSounds();
    winSound.play();

    let canvasContainer = document.getElementById('canvas-container');
    let winOverlay = document.createElement('div');
    winOverlay.id = 'win-screen';
    winOverlay.style.position = 'absolute';
    winOverlay.style.top = '0';
    winOverlay.style.left = '0';
    winOverlay.style.width = '100%';
    winOverlay.style.height = '100%';
    winOverlay.style.display = 'flex';
    winOverlay.style.flexDirection = 'column';
    winOverlay.style.justifyContent = 'center';
    winOverlay.style.alignItems = 'center';
    winOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    winOverlay.style.zIndex = '10';

    let winImage = new Image();
    winImage.src = 'img/9_intro_outro_screens/win/win_2.png';
    winImage.style.width = '40%';

    // 🚀 Restart-Button hinzufügen
    let restartButton = document.createElement('button');
    restartButton.innerText = "Restart Game";
    restartButton.style.padding = "15px 30px";
    restartButton.style.fontSize = "20px";
    restartButton.style.marginTop = "20px";
    restartButton.style.cursor = "pointer";
    restartButton.style.border = "none";
    restartButton.style.fontFamily = "la-Tequila";
    restartButton.style.borderRadius = "10px";
    restartButton.style.background = "#e05606";
    restartButton.style.color = "#000";
    restartButton.style.fontWeight = "bold";

    restartButton.addEventListener("click", function() {
        restartGame();
    });

    winOverlay.appendChild(winImage);
    winOverlay.appendChild(restartButton);
    canvasContainer.appendChild(winOverlay);
}

function showGameOverScreen() {
    stopGame();
    stopAllSounds();
    gameOverSound.play();

    let canvasContainer = document.getElementById('canvas-container');
    let gameOverOverlay = document.createElement('div');
    gameOverOverlay.id = 'game-over-screen';
    gameOverOverlay.style.position = 'absolute';
    gameOverOverlay.style.top = '0';
    gameOverOverlay.style.left = '0';
    gameOverOverlay.style.width = '100%';
    gameOverOverlay.style.height = '100%';
    gameOverOverlay.style.display = 'flex';
    gameOverOverlay.style.flexDirection = 'column';
    gameOverOverlay.style.justifyContent = 'center';
    gameOverOverlay.style.alignItems = 'center';
    gameOverOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    gameOverOverlay.style.zIndex = '10';

    let gameOverImage = new Image();
    gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over!.png';
    gameOverImage.style.width = '70%';

    // 🚀 Restart-Button hinzufügen
    let restartButton = document.createElement('button');
    restartButton.innerText = "Restart Game";
    restartButton.style.padding = "15px 30px";
    restartButton.style.fontSize = "20px";
    restartButton.style.marginTop = "20px";
    restartButton.style.cursor = "pointer";
    restartButton.style.border = "none";
    restartButton.style.fontFamily = "la-Tequila";
    restartButton.style.borderRadius = "10px";
    restartButton.style.background = "#e05606";
    restartButton.style.color = "#fff";
    restartButton.style.fontWeight = "bold";

    restartButton.addEventListener("click", function() {
        restartGame();
    });

    gameOverOverlay.appendChild(gameOverImage);
    gameOverOverlay.appendChild(restartButton);
    canvasContainer.appendChild(gameOverOverlay);
}

function stopGame() {
    if (world) {
        clearInterval(world.animationInterval); // Stoppe alle Animationen
        world.character.speed = 0; // Charakter bleibt stehen
        world.keyboard = new Keyboard(); // Deaktiviert Steuerung

    }
}

function stopAllSounds() {
    if (world && world.level.enimies) {
        world.level.enimies.forEach(enemy => {
            if (enemy instanceof ChickenBoss || enemy instanceof Chicken) {
                if (enemy.CHICKEN_BOSS_SOUND) {
                    enemy.CHICKEN_BOSS_SOUND.pause();
                    enemy.CHICKEN_BOSS_SOUND.currentTime = 0;
                }
                if (enemy.chicken_sound) {
                    enemy.chicken_sound.pause();
                    enemy.chicken_sound.currentTime = 0;
                }
            }
        });
    }

    // Falls der ChickenBoss-Sound noch läuft, stoppen
    if (world && world.CHICKEN_BOSS_SOUND) {
        world.CHICKEN_BOSS_SOUND.pause();
        world.CHICKEN_BOSS_SOUND.currentTime = 0;
    }

    // Musik und andere Spiel-Sounds stoppen
    let allSounds = document.querySelectorAll("audio");
    allSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
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

    // Warte kurz nach dem Neuladen und zeige dann den Swap-Button wieder
    setTimeout(() => {
        let swapButton = document.getElementById("swap-controls-btn");
        if (swapButton) {
            swapButton.style.display = "flex"; // Button zurückholen
        }
    }, 500); // Nach 500ms warten, damit das Neuladen zuerst passiert
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
        world.canThrow = true; 
    }
});

// Mobil Buttons //
document.addEventListener("DOMContentLoaded", function () {
    let leftBtn = document.getElementById("left-btn");
    let rightBtn = document.getElementById("right-btn");
    let jumpBtn = document.getElementById("jump-btn");
    let throwBtn = document.getElementById("throw-btn");

    function activateKey(key) {
        if (world && world.keyboard) {
            world.keyboard[key] = true;
        }
    }

    function deactivateKey(key) {
        if (world && world.keyboard) {
            world.keyboard[key] = false;
        }
    }

    function preventDefaultTouch(e) {
        if (e.cancelable) e.preventDefault(); // Nur aufrufen, wenn nötig!
    }

    leftBtn.addEventListener("touchstart", (e) => {
        preventDefaultTouch(e);
        activateKey("LEFT");
    });

    leftBtn.addEventListener("touchend", (e) => {
        preventDefaultTouch(e);
        deactivateKey("LEFT");
    });

    rightBtn.addEventListener("touchstart", (e) => {
        preventDefaultTouch(e);
        activateKey("RIGHT");
    });

    rightBtn.addEventListener("touchend", (e) => {
        preventDefaultTouch(e);
        deactivateKey("RIGHT");
    });

    jumpBtn.addEventListener("touchstart", (e) => {
        preventDefaultTouch(e);
        activateKey("SPACE");
    });

    jumpBtn.addEventListener("touchend", (e) => {
        preventDefaultTouch(e);
        deactivateKey("SPACE");
    });

    throwBtn.addEventListener("touchstart", (e) => {
        preventDefaultTouch(e);
        activateKey("D");
    });

    throwBtn.addEventListener("touchend", (e) => {
        preventDefaultTouch(e);
        deactivateKey("D");
    });
});
