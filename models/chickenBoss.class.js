class ChickenBoss extends MovableObject{

    y = 85;

    height = 350;
    width = 250;

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

}