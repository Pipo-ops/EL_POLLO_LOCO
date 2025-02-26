class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [ // sind die bilder die hintereinander abgespielt werden 
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BREAK = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    BOTTLE_BREAK_SOUND = new Audio('audio/bottle/523063__magnuswaker__glass-smash-2.wav');

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_BREAK);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.speedX = 20;
        this.speedY = 15; 
        this.throw(); 
        this.animate();
        this.BOTTLE_BREAK_SOUND.volume = 0.015;
    }

    throw() {
        this.applyGravity();

        let moveInterval = setInterval(() => {
            this.x += this.speedX;

            if (this.hasHitGround() || this.hasHitEnemy()) { 
                clearInterval(moveInterval); // Stoppe die Bewegung
                this.break(); 
            }     
        }, 50);
    }

    animate() { 
        let rotationInterval = setInterval(() => {
            if (!this.isBroken) { // Animation nur, wenn die Flasche noch nicht zerbrochen ist
                this.playAnimation(this.IMAGES_ROTATION);
            } else {
                clearInterval(rotationInterval);
            }
        }, 40);
    }

    hasHitGround() {
        return this.y >= 345; // Falls die Flasche auf den Boden trifft
        
    }

    hasHitEnemy() {
        return world.level.enimies.some(enemy => {
            if (this.isColliding(enemy)) {
                if (enemy instanceof ChickenBoss) {
                    enemy.hit(); // Boss nimmt Schaden
                } else {
                    enemy.dead(); // Normales Chicken stirbt sofort
                }
                return true; // Treffer erkannt
            }
            return false;
        });
    }

    break() {
        this.isBroken = true;
        this.BOTTLE_BREAK_SOUND.play();
        this.playAnimation(this.IMAGES_BREAK); 

        setTimeout(() => {
            let index = world.throwableObjects.indexOf(this);
            if (index > -1) {
                world.throwableObjects.splice(index, 1); 
            }
        }, 800); 
    }
}