class Bottle extends MovableObject {
    y = 180;

    height = 80;
    width = 80;

    IMAGES_BOTTLE = [  
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor(){ 
        super();

        this.loadImage(this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)]);

        this.x = 200 + Math.random() * 1600; 
        this.y = 340 + Math.random();

    }

}