class Level {
    enimies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 2250;
    background_sound = new Audio('audio/backgound_musik/177304__lenguaverde__jarabe-tapatio-mariachi.mp3');

    constructor(enimies, clouds, backgroundObjects, coins, bottles){
        this.enimies = enimies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

}