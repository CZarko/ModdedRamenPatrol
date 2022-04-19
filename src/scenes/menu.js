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
        game.settings = {
            enemySpeedBase: 3,
            enemySpeedMultiplier: 0,
            gameTimer: 0,
            players: 0
        }

        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        this.menuConfig = {
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


        this.add.text(game.config.width/2,game.config.height/2 - borderUISize - borderPadding,"RAMEN PATROL",this.menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2,"A game by CZarko",this.menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2 + borderUISize + borderPadding,"Use (A)/(D) to move & (F) to fire",this.menuConfig).setOrigin(0.5,0.5);
        this.menuConfig.backgroundColor = '#f8accc';
        this.menuConfig.color = '#996861';
        this.gmodeText = this.add.text(game.config.width/2,game.config.height/2 + borderUISize*2 + borderPadding*2,"Press ← for Novice or → for Expert",this.menuConfig).setOrigin(0.5,0.5);

        this.isReady = false;
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.sound.play('sfx-select');
            if(!this.isReady) {
                game.settings.enemySpeedMultiplier = 5;
                game.settings.gameTimer = 60000;
                this.gmodeText.text = "You have selected Novice Mode.";
                this.add.text(game.config.width/2,game.config.height/2 + borderUISize*3 + borderPadding*3,"Press ← for One Player or → for CO-OP",this.menuConfig).setOrigin(0.5,0.5);
                this.menuConfig.backgroundColor = '#996861';
                this.menuConfig.color = '#e4a478';
                this.add.text(game.config.width/2,game.config.height/2 + borderUISize*4 + borderPadding*4,"P2 uses (J)/(L) to move & (H) to fire",this.menuConfig).setOrigin(0.5,0.5);
                this.isReady = true;
            } else {
                game.settings.players = 1;
                this.scene.start('play');
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.sound.play('sfx-select');
            if(!this.isReady) {
                game.settings.enemySpeedMultiplier = 10;
                game.settings.gameTimer = 45000;
                this.gmodeText.text = "You have selected Expert Mode.";
                this.add.text(game.config.width/2,game.config.height/2 + borderUISize*3 + borderPadding*3,"Press ← for One Player or → for CO-OP",this.menuConfig).setOrigin(0.5,0.5);
                this.menuConfig.backgroundColor = '#996861';
                this.menuConfig.color = '#e4a478';
                this.add.text(game.config.width/2,game.config.height/2 + borderUISize*4 + borderPadding*4,"P2 uses (J)/(L) to move & (H) to fire",this.menuConfig).setOrigin(0.5,0.5);
                this.isReady = true;
            } else {
                game.settings.players = 2;
                this.scene.start('play');
            }
        }
    }
}