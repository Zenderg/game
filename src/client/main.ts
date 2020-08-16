import * as Phaser from 'phaser';
import TextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js'
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';

import {REXUI} from "./constants/rexui";
import {LoadScene} from "./scenes/Load.scene";
import {MenuScene} from "./scenes/Menu.scene";
import {PlayScene} from './scenes/Play.scene';
import {LoginScene} from "./scenes/Login.scene";

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 630; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

const game = new Phaser.Game({
    scene:[
        LoadScene,
        LoginScene,
        PlayScene,
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
    dom: {
        createContainer: true
    },
    plugins: {
        global: [
            {
                key: REXUI.BB_CODE_TEXT,
                plugin: BBCodeTextPlugin,
                start: true
            },
            {
                key: REXUI.TEXT_EDIT,
                plugin: TextEditPlugin,
                start: true
            },
        ]
    },
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    parent: 'phaser',
});