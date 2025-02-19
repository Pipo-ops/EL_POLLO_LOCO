class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindKeyPressEvents();  // Tastatursteuerung aktivieren
        this.bindBtsPressEvents();  // Touch-Steuerung aktivieren
    }

    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) this.RIGHT = true;
            if (e.keyCode == 37) this.LEFT = true;
            if (e.keyCode == 38) this.UP = true;
            if (e.keyCode == 40) this.DOWN = true;
            if (e.keyCode == 32) this.SPACE = true;
            if (e.keyCode == 68) this.D = true;
        });

        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) this.RIGHT = false;
            if (e.keyCode == 37) this.LEFT = false;
            if (e.keyCode == 38) this.UP = false;
            if (e.keyCode == 40) this.DOWN = false;
            if (e.keyCode == 32) this.SPACE = false;
            if (e.keyCode == 68) this.D = false;
        });
    }

    bindBtsPressEvents() {
        const buttons = [
            { id: 'btnLeft', action: 'LEFT' },
            { id: 'btnRight', action: 'RIGHT' },
            { id: 'btnJump', action: 'SPACE' },
            { id: 'btnThrow', action: 'D' }
        ];

        buttons.forEach(({ id, action }) => {
            let button = document.getElementById(id);
            if (button) {
                button.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    this[action] = true;
                });

                button.addEventListener("touchend", (e) => {
                    e.preventDefault();
                    this[action] = false;
                });
            }
        });
    }
}