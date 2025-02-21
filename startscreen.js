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
