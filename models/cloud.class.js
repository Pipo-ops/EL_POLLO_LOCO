class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;

    constructor(){ // ist in jeder class zu finden 
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 2200;  // is die Rechnung das es immer an anderen orden auftaucht beim aktuialiesieren
        this.y = Math.random() * 50;
        this.speed = 0.03 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
         this.moveLeft(); // ist die function das sich die Wolken nach links bewegen so wie die Chicken 
    }

}