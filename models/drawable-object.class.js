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


}