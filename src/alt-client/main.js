import * as PIXI from 'pixi.js'

const app = new PIXI.Application();
document.body.appendChild(app.view);

const dudes = [];

const x = 0;
const y = 2;
const baseTexture = new PIXI.BaseTexture('assets/sprite/anna.png');
const texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(64*x, 64*y, 64, 64));
const dude = PIXI.Sprite.from(texture);

dude.anchor.set(0.5);
dude.scale.set(0.8 + Math.random() * 0.3);
dude.x = 0.5 * app.screen.width;
dude.y = 0.5 * app.screen.height;

dude.direction = Math.random() * Math.PI * 2;
dude.turningSpeed = 0.5;

dude.speed = 2;

dudes.push(dude);

app.stage.addChild(dude);

app.ticker.add(() => {
    const dude = dudes[0];
    dude.x+=5;
    dude.y+=5;
});
