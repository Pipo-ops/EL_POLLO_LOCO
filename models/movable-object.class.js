class MovableObject extends DrawableObject { 
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   energy = 100;
   lastHit = 0;

   applyGravity() {
      setInterval(() => {
          if (this.isDead()) {
              // Langsames Fallen, wenn der Charakter tot ist
              this.speedY += this.acceleration * 0.2; // Beschleunigung reduzieren
              this.y += this.speedY; // Bewege den Charakter nach unten
          } else {
              // Normale Gravitation, wenn der Charakter noch lebt
              if (this.isAboveGround() || this.speedY > 0) {
                  this.y -= this.speedY; // Bewege nach oben oder unten
                  this.speedY -= this.acceleration; // Verlangsame die vertikale Geschwindigkeit durch Gravitation
              } else {
                  this.speedY = 0; // Stoppe die Bewegung, wenn der Boden erreicht ist
              }
          }
      }, 1000 / 25); // 25 FPS
  }

   isAboveGround() {
      if(this instanceof ThrowableObject) {
         return true;
      } else {
         return this.y <  151  ;     // Ist über dem Boden, wenn y kleiner als 160 ist
      }
   }

   isColliding(mo) {
      return (
          this.x + this.width + 20 > mo.x && // Reduzierte Breite für präzisere Kollision
          this.y + this.height + 20 > mo.y && // Kollision wird weiter unten registriert
          this.x + 20 < mo.x + mo.width && // Charakter darf nicht zu weit weg sein
          this.y + 20 < mo.y + mo.height // Charakter darf nicht zu tief sein
      );
  }
  
   hit() {
      if (this.isInvincible) {
          return; // Charakter ist unverwundbar und kann keinen Schaden nehmen
      }

      this.energy -= 20; // Energie verringern
      if (this.energy < 0) {
          this.energy = 0; // Energie nicht unter 0
      } else {
          this.lastHit = new Date().getTime(); // Zeit des letzten Treffers speichern
          this.makeInvincible(); // Unverwundbarkeit aktivieren
      }
   }

   makeInvincible() {
      this.isInvincible = true; // Unverwundbar machen
      setTimeout(() => {
         this.isInvincible = false;
      }, 500); // 500 ms = 1/2 Sekunden
   }

   hitCoin() {
      this.lastHit = new Date().getTime();
   }

   isHurt(){
      let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
      timepassed = timepassed / 1000; // Difference in sekunden
      return timepassed < 0.4;
   }

   isDead() {
      return this.energy == 0;
   }

   playAnimation(images) {
      if (images && images.length > 0) { // Überprüfen, ob das Array gültig ist
          let i = this.currentImage % images.length; // Verwende das übergebene Array
          let path = images[i];
          this.img = this.imageCache[path];
          this.currentImage++;
      }
   }

   moveRight() { // ist die funktion die für alle beweglichen elemente nach Rechts verandwortlich ist 
      this.x += this.speed;
   }

   moveLeft(){ // ist die funktion die für alle beweglichen elemente nach links verandwortlich ist 
      this.x -= this.speed;
      setInterval( () =>{
      },1000 / 60);
   }
}