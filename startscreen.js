// Steuerungs menü //
document.addEventListener("DOMContentLoaded", function () {
    let controlButton = document.getElementById("toggle-controls");
    let controlsDiv = document.getElementById("controls");

    // Funktion zum Öffnen & Schließen
    function toggleControls() {
        if (controlsDiv.classList.contains("hidden")) {
            controlsDiv.classList.remove("hidden");
            controlsDiv.style.display = "block";
            controlsDiv.style.animation = "slideDown 0.5s ease-in-out forwards";
        } else {
            closeControls();
        }
    }

    // Funktion zum Schließen der Steuerung
    function closeControls() {
        controlsDiv.style.animation = "slideUp 0.5s ease-in-out forwards";
        setTimeout(() => {
            controlsDiv.classList.add("hidden");
            controlsDiv.style.display = "none";
        }, 500);
    }

    // Event-Listener für den Button
    controlButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Verhindert, dass das Klick-Event auch auf `document` registriert wird
        toggleControls();
    });

    // Event-Listener für das gesamte Dokument (Schließen durch Klick außerhalb)
    document.addEventListener("click", function (event) {
        if (!controlsDiv.contains(event.target) && !controlButton.contains(event.target)) {
            closeControls(); // Schließe das Steuerungsfeld, wenn außerhalb geklickt wird
        }
    });
});
// Steuerungs menü //