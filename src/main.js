/* Caleb Zarko, Ramen Patrol Modded, 04/18/2022
Project took ~10 hours, I didn't really keep track.
I recieved no help at all.*/

/** MODDING CHECKLIST
 * STARTING TIER
 *      Track High Score - O
 *      Add own (copyright-free) background music to Play - O
 *      Implement the speed increase that happens after 30 sec in game - X
 *      Randomize RAMEN dir at start of each play - X
 *      Create a new scrolling tile sprite for the background - X
 *      Allow the player to control the Rocket after it's fired - X
 * NOVICE TIER
 *      Create 4 new explosion SFX and randomize which one plays on impact - O
 *      Display the time remaining (in seconds) on the screen - X
 *      Replace the UI borders with new artwork - X
 *      Create a new animated sprite for RAMEN enemies - X
 *      Create a new title screen (new artwork, typography, layout) - O
 *      Implement parallax scrolling - X
 * Intermediate Tier
 *      Create a new spaceship type that's smaller, moves faster, and is worth more points - X
 *      Create new artwork for all of the in-game assets (rocket, spaceships, explosion) - X
 *      Implement a new timing/score mechanism that adds time to the clock for successful hits - X
 *      Implement mouse control for player movement and mouse click to fire - O
 *      Use Phaser's particle emitter to create a particle explosion when the rocket hits the ship - O
 *      Create and implment a new weapon (new behavior and graphics) - O
 * S Tier
 *      Implement a simultaneous two-player mode - X
 *      Redesign the game's artwork, UI, and sound to change its theme /aesthetic (not sci-fi) - X
 * #FACADE Tier
 *      Create your own mod and justify its score (requires teacher input) (bet) - O
 */


//AT LEAST 100 POINTS BETWEEN THESE
// Destroying an enemy adds time to the timer (20)
// Create new artwrok for all in-game assets (made new version of all r-patrol sprites) (20)
// Create a new spaceship (riceball) type (20)
// Implement a simltaneous two-player mode (although I did this in the form of co-op) (30)
// Replace the UI borders with new artwork (10)
// Display time in seconds (10)
// Implement Parallax Scrolling (10)
// Randomize ship dir at start (5)
// Implement speed increase after 30 seconds (this is funky in my project) (5)
// Allow the player to control rocket after firing (5)


//TOTAL FROM ABOVE LIST 135 points (NOTE: I did extra in case the simul two player was contested)



const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let keyF, keyH, keyR, p1LEFT, p1RIGHT, p2LEFT, p2RIGHT;

const borderUISize = config.height/15;
const borderPadding = borderUISize/3;

const game = new Phaser.Game(config);