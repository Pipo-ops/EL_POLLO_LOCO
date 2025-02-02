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
    statusBar = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    totalCoins = this.level.coins.length;
    totalBottles = this.level.bottles.length;
    collectedBottles = 0;
    throwableObjects = [];

    constructor(canvas, keyboard){          // diese funktion is in jeder class diese enthält alerdings die this.ctx = canvas.getContext('2d'); die is für das canvas verantwordlich
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){  // das der character und keyboard functionieren er is mit der world verbunden
        this.character.world = this;
        this.level.enimies.forEach(enemy => {
            enemy.world = this;  // Welt zuweisen
        });    
    }

    run() {
        setInterval(() =>{
            this.checkCollisions();
            this.checkCollisionsCoin();
            this.checkCollisionsBottle();
            this.checkThrowObjects();
            this.checkBottleCollision();  
        }, 100); // milli Sek.
    } 

    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle)
        }
    }

    checkCollisions() {
        if (this.character.isDead()) {
            return; // Keine weiteren Kollisionen prüfen, wenn der Charakter tot ist
        }
    
        this.level.enimies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    // Charakter springt auf das Huhn
                    enemy.dead(); // Huhn stirbt
                    this.character.speedY = 10; // Charakter prallt leicht zurück
                } else if (!this.character.isInvincible) {
                    // Normale Kollision, nur wenn der Charakter nicht unverwundbar ist
                    this.character.hit(); // Schaden am Charakter
                    this.statusBar.setPercentage(this.character.energy); // StatusBar aktualisieren
                }
            }
        });
    }
    
    checkCollisionsCoin() {
        for (this.i = this.level.coins.length - 1; this.i >= 0; this.i--) {
            if (this.character.isColliding(this.level.coins[this.i])) {
                this.level.coins.splice(this.i, 1); // Entferne Münze
                this.statusBarCoin.setPercentage(this.calculateCoinPercentage()); // Aktualisiere StatusBar
            }
        }
    }

    checkCollisionsBottle() {
        for (this.i = this.level.bottles.length - 1; this.i >= 0; this.i--) {
            if (this.character.isColliding(this.level.bottles[this.i])) {
                this.level.bottles.splice(this.i, 1); // Entferne die Flasche aus dem Spiel
                this.collectedBottles++; // Erhöhe die Anzahl der gesammelten Flaschen
                this.statusBarBottle.setPercentage(this.calculateBottlePercentage()); // Statusbar aktualisieren
            }
        }
    }

    checkBottleCollision() {
        for (this.i = this.throwableObjects.length - 1; this.i >= 0; this.i--) {
            let bottle = this.throwableObjects[this.i];
            
            // Prüfe Kollision mit normalen Hühnern
            for (this.j = this.level.enimies.length - 1; this.j >= 0; this.j--) {
                let enemy = this.level.enimies[this.j];
                
                if (bottle.isColliding(enemy)) {
                    enemy.hitByBottle();  // Animation starten und chicken verschwinden lassen
                    this.throwableObjects.splice(this.i, 1);  // Entferne die Flasche nach der Kollision
                    break;
                }
            }
        }
    }

    calculateCoinPercentage() {
        return Math.min(((this.totalCoins - this.level.coins.length) / this.totalCoins) * 100, 100);
    }

    calculateBottlePercentage() {
        return Math.min((this.collectedBottles / this.totalBottles) * 100, 100);
    }
    
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) { // Nur werfen, wenn Flaschen verfügbar sind
            this.throwableObjects.push(new ThrowableObject(this.character.x + 100, this.character.y + 100));
            this.collectedBottles--; // Eine Flasche wird verbraucht
            this.statusBarBottle.setPercentage(this.calculateBottlePercentage()); // Statusbar aktualisieren
        }
    }

    setPercentage(percentage) {
        this.percentage = Math.max(percentage, 0); // Stelle sicher, dass es nicht unter 0% fällt
        this.img = this.imageCache[this.IMAGES[this.resolveImageIndex()]];
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
        this.addObjectsToMap(this.level.bottles); 
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camara_x, 0);
        this.addToMap(this.statusBar); // für statusbar
        this.addToMap(this.statusBarBottle); 
        this.addToMap(this.statusBarCoin); 
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