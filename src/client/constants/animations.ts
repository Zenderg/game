const basic = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT",
}

export const ANIMATIONS = {
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
    }
}