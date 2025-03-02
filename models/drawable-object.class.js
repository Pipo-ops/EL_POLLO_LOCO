class DrawableObject {
    x= 120; 
   
    height = 150;
    width = 100;

    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path){
        this.img = new Image(); 
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    drawFrame(ctx){

        if(this instanceof Character) {
           ctx.beginPath();
           ctx.rect(this.x + 35, this.y +80, this.width - 60, this.height - 80) ;
        } 
        
        if(this instanceof Chicken) {
           ctx.beginPath();
           ctx.rect(this.x -5, this.y , this.width + 10, this.height );
        }  
  
        if (this instanceof Coin) {
            ctx.beginPath();
            ctx.rect(this.x + 28, this.y + 28, this.width - 56, this.height - 55); 
        } 
        
        if (this instanceof ChickenBoss ) {
            ctx.beginPath();
            ctx.rect(this.x + 20, this.y + 85, this.width - 56, this.height - 100); 
        } 

     }


}