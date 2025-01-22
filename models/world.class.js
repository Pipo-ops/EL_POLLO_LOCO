class World {
    character = new Character();
    level = level1;             //kann auch so aussehn zum Bsp enimies = level1.enimies; clouds = level1.clouds; backgroundObjects =level1.backgroundObjects;
    sun =[
        new Sun()
    ];    
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard){          // diese funktion is in jeder class diese enthält alerdings die this.ctx = canvas.getContext('2d'); die is für das canvas verantwordlich
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){  // das der character und keyboard functionieren er is mit der world verbunden
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() =>{
            this.level.enimies.forEach( (enemy) =>{
                if (this.character.isColliding(enemy) ) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 200); // milli Sek.
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// reinigt immer wieder das canvas das sich die modele nicht immer auf der anfangsbosition sind

        this.ctx.translate(this.camara_x, 0);    //verschiebt die variable immer um das 1 (x) , 2(y) 

        this.sun[0].x = -this.camara_x + 570; // verschiebt die sonne mit 

        this.addObjectsToMap(this.level.backgroundObjects);  //für alle Landschafften              // level // erklärung is jetzt da daher wir wie ganz oben level = level1; gemacht haben und die variablen aus level1.js ziehn
        this.addObjectsToMap(this.sun);  // für die Sun
        this.addToMap(this.character); // für den charactar (PEPE)
        this.addObjectsToMap(this.level.clouds);   //für alle Wolken 
        this.addObjectsToMap(this.level.enimies);  //für alle Chicken 
        this.addObjectsToMap(this.level.coins);  //für alle Coin 

        this.ctx.translate(-this.camara_x, 0);
        this.addToMap(this.statusBar); // für statusbar
        this.ctx.translate(this.camara_x, 0); 

        this.ctx.translate(-this.camara_x, 0); //verschiebt die variable wieder zurück 
        
        // Draw() wird immer wieder aufgerufen damit es wieder oben von neu zu (malen-drow) beginnt
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });

    }

    addToMap(mo) { // vereinfachte funktion für MovebleObjekt

        if (mo.otherDirection) { // diese fuction is dafür da um das bild zu spiegel wenn er nach links zum Bsp läuft
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {  // diese fuction is dafür da um das bild wieder zu endspiegeln
            this.flipImageBack(mo);
        }
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}