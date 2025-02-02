class DrawableObject {
    x= 120; // x achse = rechts Links
   
    height = 150;
    width = 100;

    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image')  <img id="image" src> 
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    drawFrame(ctx){

        if(this instanceof Character) {
           ctx.beginPath();
           ctx.lineWidth = '2';
           ctx.strokeStyle = 'blue';
           ctx.rect(this.x + 35, this.y +110, this.width - 80, this.height - 123);
           ctx.stroke();
        } 
        
        if(this instanceof Chicken) {
           ctx.beginPath();
           ctx.lineWidth = '2';
           ctx.strokeStyle = 'blue';
           ctx.rect(this.x, this.y + 6, this.width - 6, this.height - 10);
           ctx.stroke();
        }  
  
        if (this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 28, this.y + 28, this.width - 56, this.height - 55); // Passe diese Werte nach Bedarf an
            ctx.stroke();
        } 
        
        if (this instanceof ChickenBoss ) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 20, this.y + 85, this.width - 56, this.height - 100); // Passe diese Werte nach Bedarf an
            ctx.stroke();
        } 

     }


}