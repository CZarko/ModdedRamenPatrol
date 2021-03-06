class Ramen extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.anims.create({
            key: 'ramen',
            frames: this.anims.generateFrameNumbers('ramen', {start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.movementSpeed = Math.floor(Math.random()*game.settings.enemySpeedMultiplier)+game.settings.enemySpeedBase;
        this.dir = Math.round(Math.random());
        this.pointValue = 10;

        this.anims.play('ramen');
    }

    update() {
        if(this.dir == 0) {
            this.x -= this.movementSpeed;
            if(this.x < 0)
                this.reset();
        } else {
            this.x += this.movementSpeed;
            if(this.x > game.config.width)
                this.reset();
        }
    }

    reset() {
        if(this.dir == 0)
            this.x = game.config.width + Math.floor(Math.random()*game.config.width);
        else
            this.x = -Math.floor(Math.random()*game.config.width);
        this.movementSpeed = Math.floor(Math.random()*game.settings.enemySpeedMultiplier)+game.settings.enemySpeedBase;
    }
}