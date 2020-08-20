import * as Phaser from "phaser"
import Creature from "./Creature";
import {createAnimations} from "../tools/createAnimations";
import {SPRITES} from "../constants/sprites";
import {ANIMATIONS} from "../constants/animations";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5)
        scene.physics.world.enableBody(this);
        createAnimations(SPRITES.ANNA.key, this);
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
    }
}