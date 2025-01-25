class ThrowableObject extends MovableObject {

    IMAGES_ROTATION = [ // sind die bilder die hintereinander abgespielt werden 
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

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
}