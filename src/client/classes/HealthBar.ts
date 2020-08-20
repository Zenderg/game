import Phaser from "phaser";

export interface IHpConfig {
    value: number,
    max: number,
    width: number,
    height: number,
}

export class HealthBar extends Phaser.GameObjects.Graphics {
    private config: IHpConfig;

    constructor(scene: Phaser.Scene, options: {x: number, y: number}, config: IHpConfig) {
        super(scene, options);
        console.log(config);

        this.x = options.x;
        this.y = options.y;
        this.config = config;

        scene.add.existing(this);

        this.draw();
    }

    private draw() {
        const borderWidth = 1;
        const widthWithoutBorder = this.config.width - borderWidth * 2;
        const heightWithoutBorder = this.config.height - borderWidth * 2;

        this.clear();

        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, this.config.width, this.config.height);

        this.fillStyle(0xffffff);
        this.fillRect(this.x + borderWidth, this.y + borderWidth, widthWithoutBorder, heightWithoutBorder);

        if (this.config.value < 30)
        {
            this.fillStyle(0xff0000);
        }
        else
        {
            this.fillStyle(0x00ff00);
        }

        const d = Math.floor(widthWithoutBorder / this.config.max  * this.config.value);

        this.fillRect(this.x + borderWidth, this.y + borderWidth, d, heightWithoutBorder);
    }


}