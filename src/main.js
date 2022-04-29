const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//let keyF, keyH, keyR, p1LEFT, p1RIGHT, p2LEFT, p2RIGHT;

const borderUISize = config.height/15;
const borderPadding = borderUISize/3;

const game = new Phaser.Game(config);