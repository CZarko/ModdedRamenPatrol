class Fishcake extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,p_texture,lKey,rKey,fKey) {
        super(scene,x,y,texture);
        this.setScale(0.5);
        scene.add.existing(this);

        scene.anims.create({
            key: 'fishy',
            frames: this.anims.generateFrameNumbers('fishcake', {start: 0, end: 0, first: 0}),
            frameRate: 20,
            repeat: -1
        });
        scene.anims.create({
            key: 'flung',
            frames: this.anims.generateFrameNumbers('fishcake', {start: 0, end: 7, first: 0}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.play('fishy');
        
        this.hand = scene.add.sprite(this.x, 415, p_texture).setOrigin(0,0.5);
        
        scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(p_texture, {start: 0, end: 0, first: 0}),
            frameRate: 20,
            repeat: -1
        });
        scene.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers(p_texture, {start: 0, end: 1, first: 0}),
            frameRate: 20
        });

        this.firing = false;
        this.sfxFishcake = scene.sound.add('sfx-throw');
        this.movementSpeed = 4;

        this.lKey = lKey;
        this.rKey = rKey;
        this.fKey = fKey;
    }

    update() {
        if(this.firing) {
            this.y -= 10; 
            if(this.y < 0) 
                this.reset();
        }

        if(this.lKey.isDown && this.x - this.width/2 - borderUISize - borderPadding >= 0) {
            //if(!this.firing)
            this.x -= this.movementSpeed;
        }
        if(this.rKey.isDown && this.x + this.width/2 <= game.config.width - borderUISize - borderPadding) {
            //if(!this.firing)
            this.x += this.movementSpeed;
        }

        this.hand.x = this.x - this.width;
        if(Phaser.Input.Keyboard.JustDown(this.fKey) && !this.firing) {
            this.anims.play('flung');
            this.hand.anims.play('throw');
            this.firing = true;
            this.sfxFishcake.play();
        }
    }

    reset() {
        //this.x = game.config.width/2;
        this.y = game.config.height -(this.height/4 + borderUISize + borderPadding);
        this.firing = false;
        this.anims.play('fishy');
        this.hand.anims.play('idle');
    }
}