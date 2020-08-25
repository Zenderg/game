import * as Phaser from "phaser";

const basic = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT",
}

interface IAnimation {
    spriteKey: string,
    animationKey: string,
    frameRate: integer,
    framesConfig: Phaser.Types.Animations.GenerateFrameNumbers
}

interface IAnimations {
    [key: string]: {
        [key: string]: IAnimation
    }
}

export const ANIMATIONS: IAnimations = {
    CAT: {
        UP: {
            spriteKey: "CAT",
            animationKey: basic.UP,
            frameRate: 10,
            framesConfig: {
                start: 12,
                end: 15,
            }
        },
        RIGHT: {
            spriteKey: "CAT",
            animationKey: basic.RIGHT,
            frameRate: 10,
            framesConfig: {
                start: 8,
                end: 11,
            }
        },
        DOWN: {
            spriteKey: "CAT",
            animationKey: basic.DOWN,
            frameRate: 10,
            framesConfig: {
                start: 0,
                end: 3,
            }
        },
        LEFT: {
            spriteKey: "CAT",
            animationKey: basic.LEFT,
            frameRate: 10,
            framesConfig: {
                start: 4,
                end: 7,
            }
        }
    },
    ANNA: {
        UP: {
            spriteKey: "ANNA",
            animationKey: basic.UP,
            frameRate: 30,
            framesConfig: {
                start: 0,
                end: 8,
            }
        },
        RIGHT: {
            spriteKey: "ANNA",
            animationKey: basic.RIGHT,
            frameRate: 30,
            framesConfig: {
                start: 27,
                end: 35,
            }
        },
        DOWN: {
            spriteKey: "ANNA",
            animationKey: basic.DOWN,
            frameRate: 30,
            framesConfig: {
                start: 18,
                end: 26,
            }
        },
        LEFT: {
            spriteKey: "ANNA",
            animationKey: basic.LEFT,
            frameRate: 30,
            framesConfig: {
                start: 9,
                end: 17,
            }
        }
    },
    AARON: {
        UP: {
            spriteKey: "AARON",
            animationKey: basic.UP,
            frameRate: 20,
            framesConfig: {
                start: 104,
                end: 112,
            }
        },
        RIGHT: {
            spriteKey: "AARON",
            animationKey: basic.RIGHT,
            frameRate: 20,
            framesConfig: {
                start: 143,
                end: 151,
            }
        },
        DOWN: {
            spriteKey: "AARON",
            animationKey: basic.DOWN,
            frameRate: 20,
            framesConfig: {
                start: 130,
                end: 138,
            }
        },
        LEFT: {
            spriteKey: "AARON",
            animationKey: basic.LEFT,
            frameRate: 20,
            framesConfig: {
                start: 117,
                end: 125,
            }
        }
    }
}