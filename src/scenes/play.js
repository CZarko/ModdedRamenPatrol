class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('bamboo', './assets/bamboo.png');
        this.load.image('fishcake', './assets/Fishcake.png');
        this.load.image('ramen', './assets/ramen.png');
        this.load.spritesheet('magi-splosion', './assets/magi-splosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 9});
    }
    
    create() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // scrolling background
        this.bamboo = this.add.tileSprite(0,0, 640, 480, 'bamboo').setOrigin(0,0);
        
        // game player
        this.fishcake = new Fishcake(this, game.config.width/2, game.config.height -(this.height + borderUISize + borderPadding), 'fishcake').setOrigin(0.5,0.5);
        this.fishcake.reset();

        // enemy ramens
        this.enemies = [];
        for(let i = 0; i < 3; i++) {
            this.enemies.push(new Ramen(this, game.config.width + Math.floor(Math.random()*game.config.width), 50 + borderPadding*2 + borderUISize*3 + 75*i, 'ramen').setOrigin(0.5,0.5));
        }

        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0xfaaa96).setOrigin(0,0);

        // game borders
        this.add.rectangle(0,0,game.config.width,borderUISize,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize,game.config.height,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(0,game.config.height-borderUISize,game.config.width,borderUISize,0xf5cec5).setOrigin(0,0);
        this.add.rectangle(game.config.width-borderUISize,0,borderUISize,game.config.height,0xf5cec5).setOrigin(0,0);

        // animation config
        this.anims.create({
            key: 'splosion',
            frames: this.anims.generateFrameNumbers('magi-splosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5,0);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← Menu', scoreConfig).setOrigin(0.5,0);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.bamboo.tilePositionX -=2;

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx-select');
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx-select');
            this.scene.start("menu");
        }

        if(!this.gameOver) { 
            this.fishcake.update();
            for(let enemy of this.enemies) {
                enemy.update();
                if(this.checkCollision(this.fishcake, enemy)) {
                    this.fishcake.reset();
                    this.magicRamenExplode(enemy);
                }
            }
        }
    }

    checkCollision(fishcake, ramen) {
        if(fishcake.x < ramen.x + ramen.width &&
            fishcake.x + fishcake.width > ramen.x &&
            fishcake.y < ramen.y + ramen.height &&
            fishcake.y + fishcake.height > ramen.y)
            return true;
        return false;
    }

    magicRamenExplode(ramen) {
        ramen.alpha = 0;
        let magic = this.add.sprite(ramen.x, ramen.y, 'magi-splosion').setOrigin(0.5,0.5);
        magic.anims.play('splosion');
        magic.on('animationcomplete', () => {
            ramen.reset();
            ramen.alpha = 1;
            magic.destroy();
        });
        this.p1Score += ramen.pointValue;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx-splosion');
    }
}