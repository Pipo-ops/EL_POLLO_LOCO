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

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.trow(); 
        this.animate();
    }

    trow () {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }

    animate(){ // Diese function fürt die animation aus 
         
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            
        },40); // is die zeit der Animation
    }

    breakBottle() {
        this.playAnimation(this.IMAGES_BREAK);  // Spiele die Zersplitterungsanimation ab
        
        setTimeout(() => {
            this.removeFromWorld();  // Entferne die Flasche nach der Animation
        }, 300);
    }

    removeFromWorld() {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}