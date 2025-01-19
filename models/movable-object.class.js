class MovableObject { 
   x= 120; // x achse = rechts Links
   img;
   height = 150;
   width = 100;
   imageCache = {};
   currentImage = 0;
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;

   applyGravity() {
      setInterval(() => {
          if (this.isAboveGround() || this.speedY > 0) { // Wenn in der Luft oder nach oben springend
              this.y -= this.speedY; // Bewege nach oben oder unten
              this.speedY -= this.acceleration; // Verlangsame die vertikale Geschwindigkeit durch Gravitation
          } else {
              this.speedY = 0; // Stoppe die Bewegung, wenn der Boden erreicht ist
          }
      }, 1000 / 25);
   }

   isAboveGround() {
      return this.y <  151  ;     // Ist über dem Boden, wenn y kleiner als 160 ist
   }

   loadImage(path){
      this.img = new Image(); // this.img = document.getElementById('image')  <img id="image" src> 
      this.img.src = path;
   }

   /**
   * 
   * @param {Array} arr - ['img/imge1.png', 'img/imge2.png', ......]
   */
   loadImages(arr) { // is für das durladen der bilder verantwordlich
      arr.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });   
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