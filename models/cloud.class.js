class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 2200;  
        this.y = Math.random() * 50;
        this.speed = 0.03 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
         this.moveLeft(); 
    }

}