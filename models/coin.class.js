class Coin extends MovableObject {
    y = 180;

    height = 80;
    width = 80;

    IMAGES_COIN = [ // sind die bilder die hintereinander abgespielt werden 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
        
    ]

    constructor(){ 
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);

        this.x = 200 + Math.random() * 1600; // zufälliges erscheinen zwischen 200 und 700 bei jedem neuen Laden
        this.y = 130 + Math.random() * 60;

        this.animate();

    }

    animate(){ // Diese function fürt die animation aus 

        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        },150); // is die zeit der Animation
    }
}