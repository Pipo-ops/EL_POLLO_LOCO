class ChickenBoss extends MovableObject {
    y = 85;
    height = 350;
    width = 250;
    health = 3;
    isDead = false;
    isAttacking = false; // Neue Variable: Ist der Boss im Angriffsmodus?

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

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);

        this.x = 2500;
        this.img = new Image();
        this.img.src = this.IMAGES_ANGRY[0];

        this.img.onload = () => {
            this.animate();
        };
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                if (!this.isAttacking && this.isCharacterInSight()) {
                    this.playAnimation(this.IMAGES_ANGRY);
                    setTimeout(() => {
                        this.startAttack();
                    }, 2000);
                }
            }
        }, 240);
    }

    isCharacterInSight() {
        if (!world || !world.character) return false; // Stelle sicher, dass world und character existieren
    
        let distance = Math.abs(world.character.x - this.x);
        return distance < 500;
    }

    startAttack() {
        this.isAttacking = true;
        clearInterval(this.animationInterval);
        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveTowardsCharacter();
            }
        }, 150);
    }

    moveTowardsCharacter() {
        let speed = 8; 
        if (this.x > world.character.x) {
            this.x -= speed;
        } else {
            this.x += speed;
        }

        if (this.isColliding(world.character)) {
            world.character.hit();
            this.isAttacking = false;
            clearInterval(this.animationInterval);
            this.startAttackMode(); // Wechsel in Attack-Mode nach erstem Treffer
        }
    }

    startAttackMode() {
        this.isAttacking = true;
        clearInterval(this.animationInterval);
        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_ATTACK); // Attack-Animation starten
                this.moveTowardsCharacter(); // Weiterhin Charakter verfolgen
            }
        }, 150);
    }

    hit() {
        if (!this.isDead) {
            this.health--;
            world.statusbarChickenBoss.setPercentage(this.health * 33.3);

            if (this.health > 0) {
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.startAttackMode(); // Nach erstem Treffer wechselt er in den Attack-Modus
                }, 500);
            } else {
                this.die();
            }
        }
    }

    die() {
        this.isDead = true;
        clearInterval(this.animationInterval); // Stoppe die bisherige Animation
    
        let deathAnimationIndex = 0;
        let deathAnimationInterval = setInterval(() => {
            if (deathAnimationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[deathAnimationIndex]]; // Setze das nächste Bild der Animation
                deathAnimationIndex++;
            } else {
                clearInterval(deathAnimationInterval); // Beende die Animation
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]; // Bleibe beim letzten Bild
            }
        }, 200); // 200ms für jedes Bild der Dead-Animation
    }
}
