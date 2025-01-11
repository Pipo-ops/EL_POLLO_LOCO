class World {
    character = new Character();
    enimies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 80)
    ];
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// reinigt immer wieder das canvas das sich die modele nicht immer auf der anfangsbosition sind

        this.addToMap(this.character) // für den charactar (PEPE)
        this.addObjectsToMap(this.enimies)  //für alle Chicken 
        this.addObjectsToMap(this.clouds)   //für alle Wolken 
        this.addObjectsToMap(this.backgroundObjects)  //für alle Landschafften
           
        // Draw() wird immer wieder aufgerufen 
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });

    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // vereinfachte funktion für MovebleObjekt
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}