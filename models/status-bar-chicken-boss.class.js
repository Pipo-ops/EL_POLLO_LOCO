class StatusbarChickenBoss extends DrawableObject {


    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png', //0
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'//5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 2500;
        this.y = 0;
        this.width = 220;
        this.height = 65;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = Math.max(0, percentage);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }    

    resolveImageIndex() {
        if (this.percentage > 60) {
            return 4; 
        } else if (this.percentage > 0) {
            return 3; 
        } else {
            return 0; 
        }
    }
      
}