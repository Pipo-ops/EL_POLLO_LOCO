/**
 * Manages the sounds in the game.
 */
class SoundManager {
    constructor() {
        this.sounds = {
            walking: new Audio('audio/walk/414331__unlistenable__walking_1.wav'),
            jump: new Audio('audio/jump/667297__pekena_larva__voc_male_jump_05.wav'),
            snoring: new Audio('audio/sleeping/114609__daxter31__snoring.wav'),
            hurt: new Audio('audio/hurtDeadCharacter/745185__mrechobot__hurt1.wav'),
            dead: new Audio('audio/hurtDeadCharacter/527819__rvgerxini__dead-laptop-sound.mp3'),
            coin: new Audio('audio/coin/400112__the-sacha-rush__natural-metal-coin-sound-4.wav'),
            bottle: new Audio('audio/bottle/746932__kzarkses__watrpour_water-pouring-glas-close_cp_none_mke-sg.wav'),
            bottleBreak: new Audio('audio/bottle/523063__magnuswaker__glass-smash-2.wav'),
            throw: new Audio('audio/bottle/475837__rionka__bottle.wav'),
            chickenDead: new Audio('audio/chicken/576604__sound_in_transition__klickender-schlag.wav'),
            bossAlert: new Audio('audio/chicken/754972__mastersoundboy2005__reverse-bird-clucking.wav'),
            bossHurt: new Audio('audio/chicken/576604__sound_in_transition__klickender-schlag.wav'),
            bossDead: new Audio('audio/chicken/576604__sound_in_transition__klickender-schlag.wav'),
            win: new Audio('audio/backgound_musik/270528__littlerobotsoundfactory__jingle_win_00.wav'),
            gameOver: new Audio('audio/backgound_musik/76376__deleted_user_877451__game_over.wav'),
            backgroundMusic: new Audio('audio/backgound_musik/177304__lenguaverde__jarabe-tapatio-mariachi.mp3')
        };
        this.lastPlayed = {}; 
        this.volume = 1.0; 

        this.setInitialVolumes();
        this.monitorVolume(); 
    }

     /**
     * Sets the initial volumes for each sound.
     */
     setInitialVolumes() {
        this.sounds.walking.initialVolume = 0.5;
        this.sounds.jump.initialVolume = 0.5;
        this.sounds.snoring.initialVolume = 0.1;
        this.sounds.hurt.initialVolume = 0.5;
        this.sounds.dead.initialVolume = 0.5;
        this.sounds.coin.initialVolume = 0.5;
        this.sounds.bottle.initialVolume = 0.5;
        this.sounds.bottleBreak.initialVolume = 0.5;
        this.sounds.throw.initialVolume = 0.5;
        this.sounds.chickenDead.initialVolume = 0.5;
        this.sounds.bossAlert.initialVolume = 0.3;
        this.sounds.bossHurt.initialVolume = 0.5;
        this.sounds.bossDead.initialVolume = 0.5;
        this.sounds.win.initialVolume = 0.5;
        this.sounds.gameOver.initialVolume = 0.5;
        this.sounds.backgroundMusic.initialVolume = 0.08; 

        this.setAllVolumes();
    }

    /**
     * Sets the volume for all sounds.
     * @param {number} volume - The volume level to set.
     */
    setVolume(volume) {
        this.volume = volume;
        this.setAllVolumes();
    }

    /**
     * Plays the specified sound.
     * @param {string} soundName - The name of the sound to play.
     * @param {number} [cooldown=1000] - The cooldown time in milliseconds.
     * @param {number} [volume=this.volume] - The volume level to set.
     */
    play(soundName, cooldown = 1000, volume = this.volume) {
        if (isMuted) return;
        const currentTime = new Date().getTime();
        if (this.sounds[soundName]) {
            if (!this.lastPlayed[soundName] || currentTime - this.lastPlayed[soundName] >= cooldown) {
                this.sounds[soundName].volume = volume;
                this.sounds[soundName].currentTime = 0; 
                this.sounds[soundName].play().catch(() => {
                });
                this.lastPlayed[soundName] = currentTime; 
            }
        }
    }

    /**
     * Plays the background music in a loop.
     */
    playBackgroundMusic() {
        this.sounds.backgroundMusic.loop = true;
        this.sounds.backgroundMusic.play().catch(() => {
        });
    }

    /**
     * Plays the boss alert sound in a loop.
     */
    playBossAlert() {
        this.sounds.bossAlert.loop = true;
        this.sounds.bossAlert.play().catch(() => {
        });
    }

    /**
     * Pauses the specified sound.
     * @param {string} soundName - The name of the sound to pause.
     */
    pause(soundName) {
        if (this.sounds[soundName] && !this.sounds[soundName].paused) {
            this.sounds[soundName].pause();
        }
    }

    /**
     * Stops the specified sound.
     * @param {string} soundName - The name of the sound to stop.
     */
    stop(soundName) {
        if (this.sounds[soundName]) {
            if (!this.sounds[soundName].paused) {
                this.sounds[soundName].pause();
            }
            this.sounds[soundName].currentTime = 0;
        }
    }

    /**
     * Pauses all sounds.
     */
    pauseAllSounds() {
        Object.keys(this.sounds).forEach(soundName => {
            this.pause(soundName);
        });
    }

    /**
     * Stops all sounds.
     */
    stopAllSounds() {
        Object.keys(this.sounds).forEach(soundName => {
            this.stop(soundName);
        });
    }

    /**
     * Sets the volume for all sounds based on the current volume level.
     */
    setAllVolumes() {
        Object.keys(this.sounds).forEach(soundName => {
            this.sounds[soundName].volume = isMuted ? 0 : this.sounds[soundName].initialVolume;
        });
    }

    /**
     * Monitors and updates the volume for all sounds.
     */
    monitorVolume() {
        setInterval(() => {
            this.setAllVolumes();
        }, 100);
    }

    /**
     * Mutes all sounds.
     */
    muteAll() {
        Object.keys(this.sounds).forEach(soundName => {
            this.sounds[soundName].volume = 0;
        });
    }

    /**
     * Unmutes all sounds.
     */
    unmuteAll() {
        Object.keys(this.sounds).forEach(soundName => {
            this.sounds[soundName].volume = this.sounds[soundName].initialVolume;
        });
    }
}