class Character extends MovableObject {

    height = 270;
    width = 150;
    speed = 8;

    IMAGES_WALKING = [ // sind die bilder die hintereinander abgespielt werden 
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor(){ // ist in jeder class zu finden 
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate(){     // Diese function fürt die animation aus 

        setInterval(() => { 

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ //function für das nach rechts gehn             //&& this.x < this.world.level.level_end_x // bedeudung das er nicht weiter kann als die variable level_end_x in level
                this.x += this.speed;
                this.otherDirection = false; 
            }

            if (this.world.keyboard.LEFT && this.x > 0){ //function für das nach links gehn         // && this.x > 0 // bedeudung das er nicht weiter geht als die ix achs nach links is daher sie bei null beginnt
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camara_x = -this.x + 100; // is das sich die camera beim bewegen mit bewegt    //+ 100// bedeudung das die kammera werter rechts beginnt
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // bewirkt das er die darunter ausgefürten sachen nur bei Rechts und Links dücken ausführt //
                
                // Walk Animation
                let i = this.currentImage % this. IMAGES_WALKING.length; // let i = 0 % 6;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        },60); // is die zeit der Animation
    }
   
    jump(){

    }
}