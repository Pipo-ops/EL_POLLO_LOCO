class StatusBarCoin extends DrawableObject {


    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 44;
        this.width = 220;
        this.height = 65;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = Math.min(percentage, 100); 
        const path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; 
    }

    resolveImageIndex() {
        if (this.percentage >= 0 && this.percentage < 20) {
            return 0;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            return 1;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            return 2;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            return 3;
        } else if (this.percentage >= 80 && this.percentage < 100) {
            return 4;
        } else {
            return 5; 
        }
    } 
}