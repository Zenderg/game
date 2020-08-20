import Phaser from "phaser";
import {createAnimations} from "../tools/createAnimations";
import {SPRITES} from "../constants/sprites";
import Player from "./Player";
import {ANIMATIONS} from "../constants/animations";

interface IPlayerContainerConfig {
    name: string,
    hp: number,
    maxHp: number,
}

export default class PlayerContainer extends Phaser.GameObjects.Container {
    player: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, config: IPlayerContainerConfig, frames?: string | number) {
        const player = new Player(scene, 0, 0, texture, frames);
        const text = scene.add.text(0, -40, config.name).setOrigin(0.5, 0.5);

        super(scene, x, y, [player, text]);
        this.player = player;

        scene.add.existing(this);
        this.setSize(40, 50);
        this.setDepth(2);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true)
    }

    protected preUpdate(time: number, delta: number) {
        if (this.body.velocity.x > 2) {
            this.player.play(ANIMATIONS.ANNA.RIGHT.animationKey, true);
        } else if (this.body.velocity.x < -2) {
            this.player.anims.play(ANIMATIONS.ANNA.LEFT.animationKey, true);
        } else if (this.body.velocity.y < -2) {
            this.player.play(ANIMATIONS.ANNA.UP.animationKey, true);
        } else if (this.body.velocity.y > 2) {
            this.player.play(ANIMATIONS.ANNA.DOWN.animationKey, true);
        } else {
            if (this.player.anims.currentAnim) {
                this.player.anims.stop();
                this.player.anims.setCurrentFrame(this.player.anims.currentAnim.frames[0]);
            }
        }
    }
}