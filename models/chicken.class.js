class Chicken extends MovableObject {
    y = 353;

    height = 70;
    width = 60;

    IMAGES_WALKING = [ // sind die bilder die hintereinander abgespielt werden 
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(){ // ist in jeder class zu finden 
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 1900; // zufälliges erscheinen zwischen 200 und 700 bei jedem neuen Laden
        this.speed = 0.15 + Math.random() * 0.5; // hir wird die geschwindichkeit berechnet 

        this.animate();
    }

    animate(){ // Diese function fürt die animation aus 
        this.moveLeft(); // ist die function das sich die chicken nach links bewegen so wie die Wolken 

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        },150); // is die zeit der Animation
    }
}