class MovableObject {
   x= 120; // x achse = rechts Links
   y= 160; // y-achse = oben unten
   img;
   height = 150;
   width = 100;
   imageCache = {};
   currentImage = 0;
   speed = 0.15;


   loadImage(path){
      this.img = new Image(); // this.img = document.getElementById('image')  <img id="image" src> 
      this.img.src = path;
   }

   /**
   * 
   * @param {Array} arr - ['img/imge1.png', 'img/imge2.png', ......]
   */
   loadImages(arr) {
      arr.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });   
   }

   moveRight() {
      console.log('Moving right');
   }

   moveLeft(){
      setInterval( () =>{
         this.x -= this.speed;
      },1000 / 60);
   }
}