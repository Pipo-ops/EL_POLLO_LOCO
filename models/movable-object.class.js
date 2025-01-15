class MovableObject { 
   x= 120; // x achse = rechts Links
   y= 160; // y-achse = oben unten
   img;
   height = 150;
   width = 100;
   imageCache = {};
   currentImage = 0;
   speed = 0.15;
   otherDirection = false;


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
      console.log('Moving right');
   }

   moveLeft(){ // ist die funktion die für alle beweglichen elemente nach links verandwortlich ist 
      setInterval( () =>{
         this.x -= this.speed;
      },1000 / 60);
   }
}