import * as Phaser from "phaser"
import {SCENES} from '../constants/scenes';
import Anna from '../classes/Anna';
import {Engine} from "../engine/main";
import {Direction} from "../../shared/models/main";
import Creature from "../classes/Creature";

export class PlayScene extends Phaser.Scene{
    anna!: Phaser.Physics.Arcade.Sprite;
    vanya: Phaser.Physics.Arcade.Sprite;

    keyboard!: {[index: string]: Phaser.Input.Keyboard.Key};
    private engine: Engine;

    constructor(){
        super({
            key: SCENES.PLAY
        })
        this.engine = new Engine();
    }
    init(){}
    preload(){
        this.load.tilemapTiledJSON("map", './assets/map2.json');
        this.load.image("tiles", './assets/tiles2.jpg');
    }
    create(){
        this.anna = new Anna(this, 400, 400, 'anna', 26);
        this.vanya = new Creature(this, 400, 400, 'cat', 26);

        // create map
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('my-tiles', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
        const buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
        buildings.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.anna, buildings);
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        //debug layers
        buildings.renderDebug(this.add.graphics(), {
            tileColor: 0,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });

        // init following camera
        this.cameras.main.startFollow(this.anna);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.anna.setSize(40,50).setOffset(10, 10);
        this.anna.setCollideWorldBounds(true);

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");
    }

    move(personName, person){
        const {position: {x,y}} = person;
        if (person.name === 'Anna') {
            console.log(this[personName].x);
            this.physics.moveTo(this[personName], x, y, 0, 33)
        }
    }

    update(time: number, delta: number){
        if(this.anna.active){
            const {me} = this.engine.state;
            const cat = this.engine.state.players[0];

            this.move('anna', me);
            this.move('vanya', cat);

            let vecX: Direction = 0;
            let vecY: Direction = 0;
            if(this.keyboard.D.isDown){
                // this.anna.setVelocityX(256);
                vecX = 1;
            }

            if(this.keyboard.A.isDown){
                // this.anna.setVelocityX(-256);
                vecX = -1;
            }
            if(this.keyboard.W.isDown){
                // this.anna.setVelocityY(-256);
                vecY = -1;
            }

            if(this.keyboard.S.isDown){
                // this.anna.setVelocityY(256);
                vecY = 1;
            }

            this.engine.move([vecX, vecY]);

            if(this.anna.body.velocity.x > 0){
                this.anna.play("right", true);
            } else if(this.anna.body.velocity.x < 0){
                this.anna.anims.playReverse("left", true);
            } else if(this.anna.body.velocity.y < 0){
                this.anna.play("up", true);
            } else if(this.anna.body.velocity.y > 0){
                this.anna.play("down", true);
            }
        }
    }
}
