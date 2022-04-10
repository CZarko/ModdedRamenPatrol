class Ramen extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.movementSpeed = Math.floor(Math.random()*game.settings.ramenSpeedMultiplier)+3;
        this.pointValue = 10;
    }

    update() {
        this.x -= this.movementSpeed;
        if(this.x < 0)
            this.reset();
    }

    reset() {
        this.x = game.config.width + Math.floor(Math.random()*game.config.width);
        this.movementSpeed = Math.floor(Math.random()*5)+3;
    }
}