import * as Phaser from "phaser"
import Creature from "./Creature";

interface hp {
    current: number,
    max: number
}

export default class Anna extends Creature {
    private hp: hp = {
        current: 0,
        max: 0
    };
    //@ts-ignore
    private hpBar: Phaser.GameObjects.Graphics;
    hpWatcher = new Proxy(this.hp, {
        get: (target:any, prop:string) => {
            return target[prop];
        },
        set: (target:any, prop:string, value:number) => {
            if(this.checkDeath()) return true;
            target[prop] = value;
            this.updateHpBar();
            return true;
        }
    });

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string | number) {
        super(scene, x, y, texture, frames);
        this.hp.max = 10;
        this.hp.current = 10;
        this.updateHpBar();
    }
    private updateHpBar = () => {
        if(this.hpBar) {
            this.scene.sys.updateList.remove(this.hpBar);
            this.scene.sys.displayList.remove(this.hpBar);
        }
        this.hpBar = this.scene.add.graphics({
            fillStyle: {
                color: 0x15fa03
            }
        });
        this.hpBar.fillRect(25, 10, (this.hp.current / this.hp.max) * 100, 5).setDepth(2);
        this.hpBar.setScrollFactor(0, 0);
    };

    private checkDeath = () => {
        if(this.hp.current <= 0) {
            this.destroy();
            return true;
        }
        return false
    };

    public reduceHp = (val: number) => {
        this.hpWatcher.current = this.hp.current + val;
    };
}