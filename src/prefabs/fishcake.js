class Fishcake extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setScale(2);
        this.firing = false;
        this.sfxFishcake = scene.sound.add('sfx-throw');
        this.movementSpeed = 4;
    }

    update() {
        if(this.firing) {
            this.y -= 10;
            //this.image.angle += 5;  
            if(this.y < 0) 
                this.reset();
        }

        if(keyLEFT.isDown && this.x - this.width/2 - borderUISize - borderPadding >= 0) {
            if(!this.firing)
                this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown && this.x + this.width/2 <= game.config.width - borderUISize - borderPadding) {
            if(!this.firing)
                this.x += this.movementSpeed;
        }

        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.firing) {
            this.firing = true;
            this.sfxFishcake.play();
        }
    }

    reset() {
        this.x = game.config.width/2;
        this.y = game.config.height -(this.height + borderUISize + borderPadding);
        this.firing = false;
    }
}