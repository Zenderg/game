import * as Phaser from 'phaser';
import {SCENES} from "../constants/scenes";
import {IMAGES} from "../constants/images";
import {SPRITES} from "../constants/sprites";
import {REXUI} from "../constants/rexui";

export class LoginScene extends Phaser.Scene {
    centerX = 0;
    centerY = 0;

    constructor() {
        super({
            key: SCENES.LOGIN,
        });
    }

    init() {
        this.centerX = this.game.renderer.width / 2;
        this.centerY = this.game.renderer.height / 2;
    }

    preload() {
    }

    create() {
        this.add.image(0, 0, IMAGES.TITLE).setOrigin(0).setDepth(0);

        this.add.text(this.centerX, this.centerY - 50, 'Введите ник', {
            color: 'yellow',
            fontSize: 36
        }).setOrigin(0.5)

        const printText = this.add.rexBBCodeText(this.centerX, this.centerY, '', {
            color: 'yellow',
            fontSize: '36px',
            fixedWidth: 400,
            fixedHeight: 60,
            backgroundColor: '#333333',
            valign: 'center'
        })
            .setOrigin(0.5)
            .setDepth(2)
            .setInteractive()
            .on('pointerdown', () => {
                this.plugins.get(REXUI.TEXT_EDIT).edit(printText, {
                    type: 'text',
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                    }
                });
            });

        this.add.image(this.centerX, this.centerY + 110, IMAGES.PLAY)
            .setDepth(1)
            .setInteractive()
            .on('pointerup', () => {
                this.scene.start(SCENES.PLAY);
            });
    }
}