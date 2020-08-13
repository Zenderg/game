import * as Phaser from 'phaser';
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 630; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

const game = new Phaser.Game({
    scene:[
        LoadScene,
        MenuScene
    ],
    render:{
        pixelArt: true
    },
    physics:{
        default: 'arcade',
        arcade:{
            debug: true
        }
    },
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    }
});