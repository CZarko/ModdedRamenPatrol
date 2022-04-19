class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('border', './assets/border.png');
        this.load.image('bamboo', './assets/bamboo.png');
        this.load.image('bushes', './assets/bushes.png');
        this.load.spritesheet('fishcake', './assets/Fishcake.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('throwing-hand', './assets/throwing-hand.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('hand-of-throwing', './assets/throwing-hand2.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('ramen', './assets/ramen.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3});
        this.load.spritesheet('riceball', './assets/riceball.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
    }
    
    create() {
        // input connection
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        p1LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        p1RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        p2LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        p2RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        
        // animation config for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 13, first: 0}),
            frameRate: 30
        });

        // parallaxing scrolling background objects
        this.bamboo = this.add.tileSprite(0,0,640,480,'bamboo').setOrigin(0,0);
        this.bushes = this.add.tileSprite(0,0,640,480,'bushes').setOrigin(0,0);

        // game player(s) 
        this.players = [];
        let fishcake = new Fishcake(this, game.config.width/2 - (100 * (game.settings.players-1)), game.config.height -(this.height/4 + borderUISize + borderPadding), 'fishcake', 'throwing-hand', p1LEFT, p1RIGHT, keyF).setOrigin(0.5,0.5);
        fishcake.reset();
        this.players.push(fishcake);
        if(game.settings.players == 2) {
            fishcake = new Fishcake(this, game.config.width/2 + (100 * (game.settings.players-1)), game.config.height -(this.height/4 + borderUISize + borderPadding), 'fishcake', 'hand-of-throwing', p2LEFT, p2RIGHT, keyH).setOrigin(0.5,0.5);
            fishcake.reset();
            this.players.push(fishcake);
        }
        

        // enemy initialization
        this.enemies = [];
        for(let i = 0; i < 3; i++) {
            this.enemies.push(new Ramen(this, game.config.width + Math.floor(Math.random()*game.config.width), 50 + borderPadding*2 + borderUISize*3 + 75*i, 'ramen').setOrigin(0.5,0.5));
            this.enemies.push(new Riceball(this, game.config.width + Math.floor(Math.random()*game.config.width), 75 + borderPadding*2 + borderUISize + 75*i, 'riceball').setOrigin(0.5,0.5));
        }

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0xfaaa96).setOrigin(0,0);

        // game borders
        /*this.add.rectangle(0,0,game.config.width,borderUISize,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize,game.config.height,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(0,game.config.height-borderUISize,game.config.width,borderUISize,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(game.config.width-borderUISize,0,borderUISize,game.config.height,0xf5cec5).setOrigin(0,0);*/

        this.add.sprite(0,0,'border').setOrigin(0,0);
        
        // initialize score
        this.p1Score = 0;

        // display score
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#996861',
            color: '#e4a478',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.textConfig);
       
        // GAME OVER flag
        this.gameOver = false;

        // initialize timer and elapsed
        this.remainingTime = game.settings.gameTimer / 1000;
        this.elsapsedTime = 0;
        // begin clock routine and display timer
        this.clock = this.time.delayedCall(1000, () => {
            this.updateTimer();
        }, null, this);
        this.timerRight = this.add.text(game.config.width - (borderUISize + borderPadding) - this.textConfig.fixedWidth, borderUISize + borderPadding*2, this.remainingTime, this.textConfig);

        this.textConfig.fixedWidth = 0;
    }

    update() {
        // Parallaxing Background
        this.bamboo.tilePositionX -=0.5;
        this.bushes.tilePositionX -=2;

        // Restart Button
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx-select');
            this.scene.restart();
        }

        // Return to Menu Button
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx-select');
            this.scene.start("menu");
        }

        // Timer Text Updating
        this.timerRight.text = this.remainingTime;

        // Game Sprite Updating
        if(!this.gameOver) { 
            for(let enemy of this.enemies)
                enemy.update();
            for(let player of this.players) {
                player.update();
                for(let enemy of this.enemies) {
                    if(this.checkCollision(player, enemy)) {
                        player.reset();
                        this.explode(player, enemy);
                    }
                }
            }
        }
    }

    checkCollision(obj1, obj2) {
        if(obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y)
            return true;
        return false;
    }

    explode(player, obj) {
        // make enemy object invisible
        obj.alpha = 0;
        // create explosion gameobject and animate
        let explosion = this.add.sprite(obj.x, obj.y, 'explosion').setOrigin(0.5,0.5);
        explosion.setScale(2);
        explosion.anims.play('explode');
        explosion.on('animationcomplete', () => {
            obj.reset();
            obj.alpha = 1;
            explosion.destroy();
        });

        //TODO: Modify
        // Increase score of player
        this.p1Score += obj.pointValue;
        this.scoreLeft.text = this.p1Score;
        
        // Increase remaining time
        this.remainingTime += 1;

        //TODO: Modify
        this.sound.play('sfx-splosion');
    }

    updateTimer() {
        if(this.remainingTime > 0) {
            this.remainingTime -= 1;
            
            this.elsapsedTime += 1;
            if(this.elsapsedTime == 30)
                game.settings.enemySpeedBase *= 2;
            
            this.clock = this.time.delayedCall(1000, () => {
                this.updateTimer();
            }, null, this);
        } else {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.textConfig).setOrigin(0.5,0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← Menu', this.textConfig).setOrigin(0.5,0);
            this.gameOver = true;
        }

    }
}

