class Coin extends MovableObject {
    y = 180;

    height = 80;
    width = 80;

    IMAGES_COIN = [ 
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    COIN_SOUND = new Audio('audio/coin/400112__the-sacha-rush__natural-metal-coin-sound-4.wav');

    constructor(){ 
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);

        this.x = 200 + Math.random() * 1600;
        this.y = 130 + Math.random() * 60;

        this.COIN_SOUND.volume = 0.5;
        this.animate();

    }

    animate(){  

        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        },150); 
    }

    playCoinSound() {
        this.COIN_SOUND.currentTime = 0; 
        this.COIN_SOUND.play();
    }
}