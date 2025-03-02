class Chicken extends MovableObject {
    y = 345;

    height = 70;
    width = 60;

    IMAGES_WALKING = [ // sind die bilder die hintereinander abgespielt werden 
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',   
    ];

    chicken_sound = new Audio('audio/chicken/766255__edenfallen__anmlfarm-ext_chickensclucking_siyabonga_ngobese_owsfx.wav');
    chicken_dead_sound = new Audio('audio/chicken/576604__sound_in_transition__klickender-schlag.wav');
    
    constructor(){ 
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);

        this.x = 250 + Math.random() * 1900;
        this.speed = 0.15 + Math.random() * 0.5; 

        this.chicken_dead_sound.volume = 0.1;
        this.chicken_sound.volume = 0.005;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            //this.chicken_sound.play();
        }, 150);
    }
    
    
    hitByBottle() {
        this.isDead = true; 
        clearInterval(this.animationInterval);  
        this.dead();    
    }

    dead() {
        this.chicken_dead_sound.play();
        this.loadImage(this.IMAGES_DEAD[0]); 
    
        setTimeout(() => {
            const index = level1.enimies.indexOf(this);
            if (index > -1) {
                level1.enimies.splice(index, 1); 
            }
        }, 100); 
    }

}    