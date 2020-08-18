import * as Phaser from 'phaser';
import {SCENES} from "../constants/scenes";
import {IMAGES} from "../constants/images";
import {SPRITES} from "../constants/sprites";
import {AUDIOS} from "../constants/audios";
import {ANIMATIONS} from "../constants/animations";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.LOAD
        });
    }
    loadImages(){
        this.load.setPath("./assets/image");

        for(let prop in IMAGES){
            this.load.image(IMAGES[prop], IMAGES[prop]);
        }
    }
    loadSprites(){
        this.load.setPath("./assets/sprite");

        for(let prop in SPRITES){
            this.load.spritesheet(SPRITES[prop].key, SPRITES[prop].path, SPRITES[prop].frameConfig);
        }
    }
    loadAudios(){
        this.load.setPath("./assets/audio");

        for(let prop in AUDIOS){
            this.load.audio(AUDIOS[prop], AUDIOS[prop]);
        }
    }
    init(){}
    preload(){
        // this.load.atlas('characters', './assets/atlas/characters.png', './assets/atlas/characters.json');
        // this.load.atlas('daze', './assets/atlas/daze.png', './assets/atlas/daze.json');

        this.loadImages();
        this.loadSprites();
        // this.loadAudios();

        let progressBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        });

        this.load.on("progress", (percent:number) => {
            progressBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 20);
        });

        this.load.on('complete', () => {
            this.scene.start(SCENES.LOGIN);
        })
    }
    create(){

    }
}
