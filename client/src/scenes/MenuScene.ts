import * as Phaser from 'phaser';
import {SCENES} from "../constants/scenes";
import {IMAGES} from "../constants/images";
import {SPRITES} from "../constants/sprites";

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENES.MENU
        });
    }
    init(){}
    preload(){
        console.log("MENU preload")
        this.load.image(IMAGES.TITLE, `dist/assets/image/${IMAGES.TITLE}`);
    }
    create(){
        console.log("MENU create");
        this.add.image(0,0, IMAGES.TITLE).setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, IMAGES.LOGO).setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, IMAGES.PLAY).setDepth(1);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, IMAGES.OPTIONS).setDepth(1);
        let cat = this.add.sprite(100, 100, SPRITES.CAT).setDepth(1);

        this.anims.create({
            key: 'walk',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers( SPRITES.CAT, {
                frames: [0,1,2,3]
            })
        });

        cat.setScale(2);
        cat.setVisible(false);

        playButton.setInteractive();
        playButton.on('pointerover', () => {
            cat.setVisible(true);
            cat.x = playButton.x - playButton.width;
            cat.y = playButton.y;
            console.log(cat);
            cat.play('walk');
        });

        playButton.on('pointerout', () => {
            cat.setVisible(false);
        });

        playButton.on('pointerup', () => {
            this.scene.start(SCENES.PLAY);
        });
    }
}