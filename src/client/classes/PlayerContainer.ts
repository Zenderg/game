import Phaser from "phaser";
import {createAnimations} from "../tools/createAnimations";
import {SPRITES} from "../constants/sprites";
import Player from "./Player";
import {ANIMATIONS} from "../constants/animations";
import {HealthBar, IHpConfig} from "./HealthBar";

interface IPlayerContainerConfig {
    name: string,
    hp: number,
    maxHp: number,
}

export default class PlayerContainer extends Phaser.GameObjects.Container {
    player: Phaser.Physics.Arcade.Sprite;
    texture: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, config: IPlayerContainerConfig, frames?: string | number) {
        const spriteWidth = 40;
        const spriteHeight = 50;

        const player = new Player(scene, 0, 0, texture, frames);
        const text = scene.add.text(0, -40, config.name).setOrigin(0.5, 0.5);

        const hpBarWidth = spriteWidth + 10;
        const hpBarHeight = 8;
        const hpBar = new HealthBar(scene, {x: -hpBarWidth / 4, y: (-spriteHeight / 2 + hpBarHeight) + 2}, {
            max: config.maxHp,
            value: config.hp,
            height: hpBarHeight,
            width: hpBarWidth
        })

        super(scene, x, y, [player, text, hpBar]);
        this.player = player;

        scene.add.existing(this);
        this.setSize(spriteWidth, spriteHeight);
        this.setDepth(2);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true)

        this.texture = texture;
    }

    protected preUpdate(time: number, delta: number) {
        if (this.body.velocity.x > 2) {
            this.player.play(ANIMATIONS[this.texture].RIGHT.animationKey, true);
        } else if (this.body.velocity.x < -2) {
            this.player.anims.playReverse(ANIMATIONS[this.texture].LEFT.animationKey, true);
        } else if (this.body.velocity.y < -2) {
            this.player.play(ANIMATIONS[this.texture].UP.animationKey, true);
        } else if (this.body.velocity.y > 2) {
            this.player.play(ANIMATIONS[this.texture].DOWN.animationKey, true);
        } else {
            if (this.player.anims.currentAnim) {
                this.player.anims.stop();
                this.player.anims.setCurrentFrame(this.player.anims.currentAnim.frames[0]);
            }
        }
    }
}