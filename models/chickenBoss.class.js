class ChickenBoss extends MovableObject{

    y = 85;

    height = 350;
    width = 250;
    health = 3; 
    isDead = false;
    isHurt = false;

    IMAGES_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES_ANGRY [0]);    // auch eine möglichkeit um das Bild zu Laden
        this.loadImages(this.IMAGES_ANGRY );

        this.x = 2500;
        this.animate();
    }

    animate(){ // Diese function fürt die animation aus 
 
        setInterval(() => {
            this.playAnimation(this.IMAGES_ANGRY );
        },240); // is die zeit der Animation
    }

    hitByBottle() {
        this.health--;
        
        if (this.health > 0) {
            this.loadImage(this.IMAGES_HURT[0]);  // Zeige das verletzte Bild
        } else {
            this.isDead = true;  // Markiere den Boss als tot
            this.playDeathAnimation();  // Starte die Todesanimation
        }
    }
    
    playDeathAnimation() {
        this.loadImages(this.IMAGES_DEAD);
        this.currentImage = 0;

        this.deathAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);

            if (this.currentImage >= this.IMAGES_DEAD.length) {
                clearInterval(this.deathAnimationInterval);  // Stoppe die Animation nach dem letzten Bild
                this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);  // Bleibe beim letzten Bild stehen
            }
        }, 300);  // Geschwindigkeit der Todesanimation
    }

}