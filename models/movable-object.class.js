class MovableObject extends DrawableObject { 
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
   energy = 100;
   lastHit = 0;

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

   draw(ctx){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   drawFrame(ctx){

      if(this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x + 25, this.y +110, this.width - 50, this.height - 123);
      ctx.stroke();
      } 
      
      if(this instanceof Chicken) {
         ctx.beginPath();
         ctx.lineWidth = '2';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y + 6, this.width - 6, this.height - 10);
         ctx.stroke();
         }  
   }

   isColliding(mo) {
      return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
   }

   hit() {
      this.energy  -= 10;
      if(this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
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