const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
    /*physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },*/
    /*scene: {
        preload: preload,
        create: create

    }*/
}

let keyF, keyR, keyLEFT, keyRIGHT;

const borderUISize = config.height/15;
const borderPadding = borderUISize/3;

const game = new Phaser.Game(config);