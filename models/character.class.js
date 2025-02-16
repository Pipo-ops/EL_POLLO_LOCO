class Character extends MovableObject {
    y= 101; // y-achse = oben unten

    height = 270;
    width = 150;
    speed = 8;

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_WALKING = [ // sind die bilder die hintereinander abgespielt werden 
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;
    walking_sound = new Audio('audio/walk/414331__unlistenable__walking_1.wav');

    constructor(){ // ist in jeder class zu finden 
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();

        this.animate();
    }

    animate(){     // Diese function fürt die animation aus 

        setInterval(() => { 

            this.walking_sound.pause()
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ //function für das nach rechts gehn             //&& this.x < this.world.level.level_end_x // bedeudung das er nicht weiter kann als die variable level_end_x in level
                this.moveRight();
                this.otherDirection = false; 
                this.walking_sound.play(); // sound beim gehn
            }

            if (this.world.keyboard.LEFT && this.x > 0){ //function für das nach links gehn         // && this.x > 0 // bedeudung das er nicht weiter geht als die ix achs nach links is daher sie bei null beginnt
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE) {
                this.jump();
            }

            this.world.camara_x = -this.x + 100; // is das sich die camera beim bewegen mit bewegt    //+ 100// bedeudung das die kammera werter rechts beginnt

        }, 1000 / 60);

        setInterval(() => {

            
            if (this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } 
            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } 
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.img = this.imageCache['img/2_character_pepe/2_walk/W-21.png']; // Setze Standardbild
                }
            }
        },80); // is die zeit der Animation

    }
   
    jump() {
        if (!this.isAboveGround()) { // Nur springen, wenn der Charakter am Boden ist
            this.speedY = 30; // Setzt die Sprunggeschwindigkeit nach oben 
        }
    }
}