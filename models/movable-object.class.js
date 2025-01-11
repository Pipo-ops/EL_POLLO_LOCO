class MovableObject {
        x= 120; // x achse = rechts Links
        y= 250; // y-achse = oben unten
        img;
        height = 150;
        width = 100;

        loadImage(path){
           this.img = new Image(); // this.img = document.getElementById('image')  <img id="image" src> 
           this.img.src = path;
        }

        moveRight() {
           console.log('Moving right')
        }

        moveLeft(){

        }
}