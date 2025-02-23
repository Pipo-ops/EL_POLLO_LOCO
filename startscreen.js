document.addEventListener("DOMContentLoaded", function () {
    let controlsDiv = document.getElementById("controls");
    let controlsOpen = false;

    // Buttons mit diesen Klassen/IDs sollen die Steuerung umschalten
    let controlButtons = document.querySelectorAll("#toggle-controls, #control-btn-top");
    let playButtons = document.querySelectorAll(".play-btn, #play-btn-top");

    // Steuerung öffnen/schließen
    function toggleControls() {
        controlsOpen ? closeControls() : openControls();
    }

    function openControls() {
        controlsDiv.classList.remove("hidden");
        controlsDiv.style.display = "block";
        controlsDiv.style.animation = "slideDown 0.3s ease-in-out forwards";
        controlsOpen = true;
    }

    function closeControls() {
        controlsDiv.style.animation = "slideUp 0.3s ease-in-out forwards";
        setTimeout(() => {
            controlsDiv.classList.add("hidden");
            controlsDiv.style.display = "none";
            controlsOpen = false;
        }, 300);
    }

    // Event-Listener für Steuerungs-Buttons
    controlButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleControls();
        });

        button.addEventListener("touchstart", (event) => {
            event.stopPropagation();
            toggleControls();
        }, { passive: true });
    });

    // Schließen durch Klick außerhalb
    document.addEventListener("click", function (event) {
        if (controlsOpen && !controlsDiv.contains(event.target) && !event.target.closest("#toggle-controls, #control-btn-top")) {
            closeControls();
        }
    });

    document.addEventListener("touchstart", function (event) {
        if (controlsOpen && !controlsDiv.contains(event.target) && !event.target.closest("#toggle-controls, #control-btn-top")) {
            closeControls();
        }
    }, { passive: true });

    // Event-Listener für Play-Buttons (Spiel starten)
    playButtons.forEach(button => {
        button.addEventListener("click", startGame);
        button.addEventListener("touchstart", startGame, { passive: true });
    });
});

// Fullsreen //
document.addEventListener("DOMContentLoaded", function () {
    let fullscreenBtn = document.getElementById("fullscreen-btn");
    let canvasContainer = document.getElementById("canvas-container");
    let canvas = document.getElementById("canvas");
    let topControls = document.getElementById("top-controls");

    fullscreenBtn.addEventListener("click", function () {
        toggleFullscreen();
    });

    function toggleFullscreen() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            enterFullscreen(canvasContainer);
        } else {
            exitFullscreen();
        }
    }

    function enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullscreen();
        }

        // Canvas & Top-Controls aktivieren
        setTimeout(() => {
            canvas.classList.add("fullscreen-mode");
            topControls.style.display = "flex"; // Top-Controls sichtbar machen
        }, 100);
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }

        // Canvas & Top-Controls zurücksetzen
        setTimeout(() => {
            canvas.classList.remove("fullscreen-mode");
            topControls.style.display = "none"; // Top-Controls ausblenden, falls nötig
        }, 100);
    }

    // Falls Fullscreen geändert wird, Button-Icon und Top-Controls aktualisieren
    document.addEventListener("fullscreenchange", updateFullscreenState);
    document.addEventListener("webkitfullscreenchange", updateFullscreenState);

    // Überprüft, ob Fullscreen aktiv ist
    function isFullscreen() {
        return document.fullscreenElement || document.webkitFullscreenElement;
    }

    // Event-Listener für die Enter-Taste (nur wenn Fullscreen aktiv & Breite >= 1026px)
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && isFullscreen() && window.innerWidth >= 1026) {
            startGame();
        }
    });

    function updateFullscreenState() {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            fullscreenBtn.innerHTML = '<img src="./img/12.Keyboard-images/fullscreen_exit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Exit Fullscreen">';
            canvas.classList.add("fullscreen-mode");
            topControls.style.display = "flex"; // Top-Controls immer anzeigen
        } else {
            fullscreenBtn.innerHTML = '<img src="./img/12.Keyboard-images/fullscreen_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Fullscreen">';
            canvas.classList.remove("fullscreen-mode");
            topControls.style.display = "none"; // Falls sie vorher nicht sichtbar waren
        }
    }
});
// Fullsreen //

// Touch erkennung //
document.addEventListener("DOMContentLoaded", function () {
    let touchControls = document.getElementById("touch-controls");

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    if (isTouchDevice()) {
        touchControls.style.display = "flex"; // Touch-Buttons aktivieren
    }
});
// Touch erkennung //

// Rotate-warning //
document.addEventListener("DOMContentLoaded", function () {
    let rotateWarning = document.getElementById("rotate-warning");

    function isMobileDevice() {
        return window.innerWidth <= 432; // Handys bis 432px als "mobile" definieren
    }

    function isPortraitMode() {
        return window.innerHeight > window.innerWidth; // Hochformat erkennen
    }

    function checkOrientation() {
        if (isMobileDevice()) {
            if (isPortraitMode()) {
                rotateWarning.style.display = "flex"; // Zeige "Dreh dein Handy"-Meldung
            } else {
                rotateWarning.style.display = "none"; // Verstecke Meldung im Querformat
            }
        } else {
            rotateWarning.style.display = "none"; // Keine Warnung auf größeren Geräten
        }
    }

    // Überprüfung beim Laden der Seite
    checkOrientation();

    // Falls das Handy gedreht wird, erneut prüfen
    window.addEventListener("resize", checkOrientation);
});
// Rotate-warning //

// Swap Controls //
document.addEventListener("DOMContentLoaded", function () {
    let leftControls = document.getElementById("left-controls");
    let rightControls = document.getElementById("right-controls");
    let swapButton = document.getElementById("swap-controls-btn");
    let swapIcon = document.getElementById("swap-icon");
    let swapped = false; // Speichert den aktuellen Zustand

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function swapControls() {
        swapped = !swapped; // Zustand umkehren

        if (swapped) {
            // Steuerung nach rechts verschieben
            leftControls.style.left = "auto";
            leftControls.style.right = "35px";
            rightControls.style.right = "auto";
            rightControls.style.left = "20px";
            swapIcon.src = "img/12.Keyboard-images/arrows (1).png"; // Bild für "zurück wechseln"
        } else {
            // Steuerung wieder nach links verschieben
            leftControls.style.left = "10px";
            leftControls.style.right = "auto";
            rightControls.style.right = "35px";
            rightControls.style.left = "auto";
            swapIcon.src = "img/12.Keyboard-images/arrows (1).png"; // Bild für "erneut wechseln"
        }
    }

    if (isTouchDevice()) {
        swapButton.style.display = "flex"; // Button nur auf Touch-Geräten anzeigen

        // Click- & Touch-Event-Handling
        swapButton.addEventListener("click", swapControls);
        swapButton.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Touch-Ereignis nicht weitergeben
            swapControls();
        });
    }
});
// Swap Controls //

// Mute //
document.addEventListener("DOMContentLoaded", function () {
    let muteBtn = document.getElementById("mute-btn");
    let muteIcon = document.getElementById("mute-icon");
    let isMuted = false;

    function toggleMute() {
        isMuted = !isMuted;

        // 1. Mute alle existierenden <audio>-Elemente
        document.querySelectorAll("audio").forEach(sound => {
            sound.muted = isMuted;
        });

        // 2. Falls das Spiel läuft, mute alle Sounds in der Welt
        if (world) {
            muteAllGameSounds(isMuted);
        }

        // 3. Icon wechseln
        muteIcon.src = isMuted 
            ? "./img/13.sound/volume_off_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" 
            : "./img/13.sound/volume_up_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
    }

    function muteAllGameSounds(mute) {
        if (!world) return;

        // 1. Hintergrundmusik und allgemeine Sounds muten
        if (winSound) winSound.muted = mute;
        if (gameOverSound) gameOverSound.muted = mute;

        // 2. Mute alle Sounds des Bosses und der Gegner
        world.level.enimies.forEach(enemy => {
            if (enemy.CHICKEN_BOSS_SOUND) enemy.CHICKEN_BOSS_SOUND.muted = mute;
            if (enemy.chicken_sound) enemy.chicken_sound.muted = mute;
            if (enemy.chicken_dead_sound) enemy.chicken_dead_sound.muted = mute; // CHICKEN-DEAD-SOUND muten
        });

        // 3. Falls der ChickenBoss-Sound läuft, mute ihn auch
        if (world.CHICKEN_BOSS_SOUND) world.CHICKEN_BOSS_SOUND.muted = mute;

        // 4. Mute Charakter-Sounds
        if (world.character) {
            if (world.character.walking_sound) world.character.walking_sound.muted = mute;
        }

        // 5. Falls geworfene Objekte (Flaschen) existieren, mute deren Sounds
        if (world.throwableObjects) {
            world.throwableObjects.forEach(object => {
                if (object.BOTTLE_BREAK_SOUND) object.BOTTLE_BREAK_SOUND.muted = mute;
            });
        }

        // 6. Mute alle Coin-Sounds
        if (world.level.coins) {
            world.level.coins.forEach(coin => {
                if (coin.COIN_SOUND) coin.COIN_SOUND.muted = mute;
            });
        }
    }

    // 7. Überwachung neuer Sounds (falls neue Sounds hinzukommen, werden sie ebenfalls gemutet)
    function watchForNewSounds() {
        setInterval(() => {
            if (isMuted) {
                muteAllGameSounds(true);
            }
        }, 50); 
    }

    muteBtn.addEventListener("click", toggleMute);
    watchForNewSounds(); // Startet die Überwachung für neue Sounds
});
// Mute //