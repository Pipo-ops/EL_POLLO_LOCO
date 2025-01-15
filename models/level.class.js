class Level {
    enimies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2250;

    constructor(enimies, clouds, backgroundObjects, coins){
        this.enimies = enimies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}