import * as Phaser from "phaser"
import {ANIMATIONS} from "../constants/animations";
import {AUDIOS} from "../constants/audios";

export const createAnimations = (spriteName: string, self: Phaser.Physics.Arcade.Sprite) => {
    const animationObject = ANIMATIONS[spriteName];

    for(let prop in animationObject){
        const anim = animationObject[prop]
        console.log(anim);
        self.anims.animationManager.create({
            key: anim.animationKey,
            frameRate: anim.frameRate,
            frames: self.anims.animationManager.generateFrameNumbers(anim.spriteKey, anim.framesConfig)
        });
    }
};