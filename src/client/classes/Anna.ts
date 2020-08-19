import * as Phaser from "phaser"
import Creature from "./Creature";

interface IAnnaConfig {
    name: string,
    hp: number,
    maxHp: number,
}

export default class Anna extends Creature {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, config: IAnnaConfig, frames?: string | number) {
        super(scene, x, y, texture, frames);
    }
}