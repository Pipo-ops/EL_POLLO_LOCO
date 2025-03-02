/**
 * Handles the visibility toggle of the control menu.
 * Opens and closes the controls when a button is clicked.
 */
document.addEventListener("DOMContentLoaded", function () {
    let controlsDiv = document.getElementById("controls");
    let controlsOpen = false;
    let controlButtons = document.querySelectorAll("#toggle-controls, #control-btn-top");
    let playButtons = document.querySelectorAll(".play-btn, #play-btn-top");

    /**
     * Toggles the control menu visibility.
     */
    function toggleControls() {
        controlsOpen ? closeControls() : openControls();
    }

    /**
     * Opens the control menu with an animation.
     */
    function openControls() {
        controlsDiv.classList.remove("hidden");
        controlsDiv.style.display = "block";
        controlsDiv.style.animation = "slideDown 0.3s ease-in-out forwards";
        controlsOpen = true;
    }

    /**
     * Closes the control menu with an animation.
     */
    function closeControls() {
        controlsDiv.style.animation = "slideUp 0.3s ease-in-out forwards";
        setTimeout(() => {
            controlsDiv.classList.add("hidden");
            controlsDiv.style.display = "none";
            controlsOpen = false;
        }, 300);
    }

    // Add event listeners to control buttons
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

    // Close controls when clicking outside
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

    // Start game when play button is clicked
    playButtons.forEach(button => {
        button.addEventListener("click", startGame);
        button.addEventListener("touchstart", startGame, { passive: true });
    });
});

/**
 * Handles fullscreen mode for the game.
 */
document.addEventListener("DOMContentLoaded", function () {
    let fullscreenBtn = document.getElementById("fullscreen-btn");
    let canvasContainer = document.getElementById("canvas-container");
    let canvas = document.getElementById("canvas");
    let topControls = document.getElementById("top-controls");

    fullscreenBtn.addEventListener("click", function () {
        toggleFullscreen();
    });

    /**
     * Toggles fullscreen mode on or off.
     */
    function toggleFullscreen() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            enterFullscreen(canvasContainer);
        } else {
            exitFullscreen();
        }
    }

    /**
     * Enters fullscreen mode for the given element.
     * @param {HTMLElement} element - The element to display in fullscreen.
     */
    function enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        setTimeout(() => {
            canvas.classList.add("fullscreen-mode");
            topControls.style.display = "flex";
        }, 100);
    }

    /**
     * Exits fullscreen mode.
     */
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setTimeout(() => {
            canvas.classList.remove("fullscreen-mode");
            topControls.style.display = "none";
        }, 100);
    }

    document.addEventListener("fullscreenchange", updateFullscreenState);
    document.addEventListener("webkitfullscreenchange", updateFullscreenState);

    /**
     * Checks if fullscreen mode is active.
     * @returns {boolean} True if fullscreen is active, false otherwise.
     */
    function isFullscreen() {
        return document.fullscreenElement || document.webkitFullscreenElement;
    }

    /**
     * Updates UI elements based on fullscreen state.
     */
    function updateFullscreenState() {
        if (isFullscreen()) {
            fullscreenBtn.innerHTML = '<img src="./img/12.Keyboard-images/fullscreen_exit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Exit Fullscreen">';
            canvas.classList.add("fullscreen-mode");
            topControls.style.display = "flex";
        } else {
            fullscreenBtn.innerHTML = '<img src="./img/12.Keyboard-images/fullscreen_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="Fullscreen">';
            canvas.classList.remove("fullscreen-mode");
            topControls.style.display = "none";
        }
    }
});

/**
 * Detects if a touch device is used and enables touch controls.
 */
document.addEventListener("DOMContentLoaded", function () {
    let touchControls = document.getElementById("touch-controls");

    /**
     * Checks if the user is on a touch device.
     * @returns {boolean} True if a touch device is detected, false otherwise.
     */
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    if (isTouchDevice()) {
        touchControls.style.display = "flex";
    }
});

/**
 * Displays a warning if the mobile device is in portrait mode.
 */
document.addEventListener("DOMContentLoaded", function () {
    let rotateWarning = document.getElementById("rotate-warning");

    /**
     * Checks if the device is a mobile device.
     * @returns {boolean} True if a mobile device is detected, false otherwise.
     */
    function isMobileDevice() {
        return window.innerWidth <= 432;
    }

    /**
     * Checks if the device is in portrait mode.
     * @returns {boolean} True if the device is in portrait mode, false otherwise.
     */
    function isPortraitMode() {
        return window.innerHeight > window.innerWidth;
    }

    /**
     * Updates the visibility of the rotate warning based on device orientation.
     */
    function checkOrientation() {
        if (isMobileDevice()) {
            rotateWarning.style.display = isPortraitMode() ? "flex" : "none";
        } else {
            rotateWarning.style.display = "none";
        }
    }

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
});

/**
 * Handles swapping of touch controls.
 */
document.addEventListener("DOMContentLoaded", function () {
    let leftControls = document.getElementById("left-controls");
    let rightControls = document.getElementById("right-controls");
    let swapButton = document.getElementById("swap-controls-btn");
    let swapIcon = document.getElementById("swap-icon");
    let swapped = false;

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    function swapControls() {
        swapped = !swapped;
        if (swapped) {
            leftControls.style.left = "auto";
            leftControls.style.right = "35px";
            rightControls.style.right = "auto";
            rightControls.style.left = "20px";
        } else {
            leftControls.style.left = "10px";
            leftControls.style.right = "auto";
            rightControls.style.right = "30px";
            rightControls.style.left = "auto";
        }
    }

    if (isTouchDevice()) {
        swapButton.style.display = "flex";
        swapButton.addEventListener("click", swapControls);
        swapButton.addEventListener("touchstart", function (event) {
            event.preventDefault();
            swapControls();
        });
    }
});

/**
 * Handles muting and unmuting game sounds.
 */
document.addEventListener("DOMContentLoaded", function () {
    let muteBtn = document.getElementById("mute-btn");
    let muteIcon = document.getElementById("mute-icon");
    let isMuted = false;

    function toggleMute() {
        isMuted = !isMuted;

        document.querySelectorAll("audio").forEach(sound => {
            sound.muted = isMuted;
        });

        if (world) {
            muteAllGameSounds(isMuted);
        }

        muteIcon.src = isMuted 
            ? "./img/13.sound/volume_off_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" 
            : "./img/13.sound/volume_up_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
    }

    function muteAllGameSounds(mute) {
        if (!world) return;

        if (winSound) winSound.muted = mute;
        if (gameOverSound) gameOverSound.muted = mute;

      
        world.level.enimies.forEach(enemy => {
            if (enemy.CHICKEN_BOSS_SOUND) enemy.CHICKEN_BOSS_SOUND.muted = mute;
            if (enemy.chicken_sound) enemy.chicken_sound.muted = mute;
            if (enemy.chicken_dead_sound) enemy.chicken_dead_sound.muted = mute;
        });

        if (world.CHICKEN_BOSS_SOUND) world.CHICKEN_BOSS_SOUND.muted = mute;

        if (world.character) {
            if (world.character.walking_sound) world.character.walking_sound.muted = mute;
        }

        if (world.throwableObjects) {
            world.throwableObjects.forEach(object => {
                if (object.BOTTLE_BREAK_SOUND) object.BOTTLE_BREAK_SOUND.muted = mute;
            });
        }

        if (world.level.coins) {
            world.level.coins.forEach(coin => {
                if (coin.COIN_SOUND) coin.COIN_SOUND.muted = mute;
            });
        }
    }

    function watchForNewSounds() {
        setInterval(() => {
            if (isMuted) {
                muteAllGameSounds(true);
            }
        }, 50); 
    }

    muteBtn.addEventListener("click", toggleMute);
    watchForNewSounds(); 
});

