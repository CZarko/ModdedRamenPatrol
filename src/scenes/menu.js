class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        this.load.audio('sfx-select', './assets/select.wav');
        this.load.audio('sfx-splosion', './assets/magi-splosion.wav');
        this.load.audio('sfx-throw', './assets/throw.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#996861',
            color: '#e4a478',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };


        this.add.text(game.config.width/2,game.config.height/2 - borderUISize - borderPadding,"RAMEN PATROL",menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2,"A game by CZarko",menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2 + borderUISize + borderPadding,"Use ← → to move & (F) to fire",menuConfig).setOrigin(0.5,0.5);
        menuConfig.backgroundColor = '#f8accc';
        menuConfig.color = '#996861';
        this.add.text(game.config.width/2,game.config.height/2 + borderUISize*2 + borderPadding*2,"Press ← for Novice or → for Expert",menuConfig).setOrigin(0.5,0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                ramenSpeedMultiplier: 5,
                gameTimer: 60000
            };
            this.sound.play('sfx-select');
            this.scene.start('play');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                ramenSpeedMultiplier: 10,
                gameTimer: 45000
            };
            this.sound.play('sfx-select');
            this.scene.start('play');
        }
    }
}