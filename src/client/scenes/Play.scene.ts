import * as Phaser from "phaser"
import {SCENES} from '../constants/scenes';
import Anna from '../classes/Anna';
import {Engine} from "../engine/main";
import {Direction, Player} from "../../shared/models/main";
import Creature from "../classes/Creature";
import {SPRITES} from "../constants/sprites";
import {createAnimations} from "../tools/createAnimations";
import {ANIMATIONS} from "../constants/animations";

export class PlayScene extends Phaser.Scene{
    me!: Phaser.Physics.Arcade.Sprite;
    players: {[key: string]: Phaser.Physics.Arcade.Sprite} = {};

    keyboard!: {[index: string]: Phaser.Input.Keyboard.Key};
    private engine: Engine;

    constructor(){
        super({
            key: SCENES.PLAY
        })
        this.engine = new Engine();
    }
    init(){
        this.engine.state$.subscribe(state => {
            const {me, players} = state;
            if(!this.me){
                this.me = new Anna(this, me.position.x, me.position.y, SPRITES.ANNA.key, 24);
                createAnimations(SPRITES.ANNA.key, this.me);
            }

            players.forEach((it: Player) => {
                if(this.players[it.id]) {

                } else {
                    this.players[it.id] = new Creature(this, me.position.x, me.position.y, SPRITES.CAT.key, 24);
                }

            })

            this.move(this.me, me);

            players.forEach((it) => {
                this.move(this.players[it.id], it);
            })
        });
    }
    preload(){
        this.load.tilemapTiledJSON("map", './assets/map2.json');
        this.load.image("tiles", './assets/tiles2.jpg');
    }
    create(){
        // create map
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('my-tiles', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
        const buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
        buildings.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.me, buildings);
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        //debug layers
        buildings.renderDebug(this.add.graphics(), {
            tileColor: 0,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });

        // init following camera
        this.cameras.main.startFollow(this.me);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.me.setSize(40,50).setOffset(10, 10);
        this.me.setCollideWorldBounds(true);

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        setTimeout(() => {
            console.log(2);
            this.init();

        }, 500);

    }

    move(player: Phaser.Physics.Arcade.Sprite, person: Player){
        const {position: {x,y}} = person;

        const distance = Phaser.Math.Distance.Between(x, y, this.me.x, this.me.y)
        if (player &&
            (this.me.body.velocity.x === 0 || this.me.body.velocity.x > 1 || this.me.body.velocity.x < -1 ||
            this.me.body.velocity.y === 0 || this.me.body.velocity.y > 1 || this.me.body.velocity.y < -1)
        ) {

            this.physics.moveTo(player, x, y, 100, 200)
        }
    }

    update(time: number, delta: number){
        if(this.me.active){
            let vecX: Direction = 0;
            let vecY: Direction = 0;

            if(this.keyboard.D.isDown){
                vecX = 1;
            }

            if(this.keyboard.A.isDown){
                vecX = -1;
            }
            if(this.keyboard.W.isDown){
                vecY = -1;
            }

            if(this.keyboard.S.isDown){
                vecY = 1;
            }

            if(vecX !== 0 || vecY !== 0) {
                this.engine.move([vecX, vecY]);
            }

            console.log(this.me.body.velocity.x, this.me.body.velocity.x < 1);

            if(this.me.body.velocity.x > 0){
                this.me.play(ANIMATIONS.ANNA.RIGHT.animationKey, true);
            } else if(this.me.body.velocity.x < 0){
                this.me.anims.play(ANIMATIONS.ANNA.LEFT.animationKey, true);
            } else if(this.me.body.velocity.y < 0){
                this.me.play(ANIMATIONS.ANNA.UP.animationKey, true);
            } else if(this.me.body.velocity.y > 0){
                this.me.play(ANIMATIONS.ANNA.DOWN.animationKey, true);
            } else {
                this.me.anims.stop();
            }
        }
    }
}
