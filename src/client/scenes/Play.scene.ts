import * as Phaser from "phaser"
import {SCENES} from '../constants/scenes';
import Player from '../classes/Player';
import {Engine} from "../engine/main";
import {Direction, Player} from "../../shared/models/main";
import Creature from "../classes/Creature";
import {SPRITES} from "../constants/sprites";
import PlayerContainer from "../classes/PlayerContainer";

export class PlayScene extends Phaser.Scene {
    me!: Phaser.GameObjects.Container;
    players: { [key: string]: Phaser.Physics.Arcade.Sprite } = {};

    keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
    private engine: Engine;

    constructor() {
        super({
            key: SCENES.PLAY
        })
        this.engine = Engine.getInstance();
    }

    init() {
        this.engine.state$.subscribe(state => {
            const {me, players} = state;
            if (!this.me) {
                this.me = new PlayerContainer(this, me.position.x, me.position.y, SPRITES.AARON.key, {
                    hp: me.health,
                    maxHp: me.maxHealth,
                    name: me.name,
                }, 24);
            }

            players.forEach((it: Player) => {
                if (this.players[it.id]) {
                    this.move(this.players[it.id], it);
                } else {
                    this.players[it.id] = new Creature(this, me.position.x, me.position.y, SPRITES.CAT.key, 24);
                }

            })

            this.move(this.me, me);

            players.forEach((it) => {
                // this.move(this.players[it.id], it);
            })
        });
    }

    preload() {
        this.load.tilemapTiledJSON("map", './assets/map2.json');
        this.load.image("tiles", './assets/tiles2.jpg');
    }

    create() {
        // create map
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('my-tiles', 'tiles');
        map.createStaticLayer('bg', tileset, 0, 0).setDepth(0);
        const buildings = map.createStaticLayer('buildings', tileset, 0, 0).setDepth(0);
        buildings.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.me, buildings);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
        //debug layers
        buildings.renderDebug(this.add.graphics(), {
            tileColor: 0,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });

        // init following camera
        this.cameras.main.startFollow(this.me);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        setTimeout(() => {
            this.init();
        }, 500);

    }

    move(player: Phaser.GameObjects.Container, person: Player) {
        const {position: {x, y}} = person;

        const distance = Phaser.Math.Distance.Between(x,y, this.me.x, this.me.y);
        if (player && distance >= 4) {
            this.physics.moveTo(player, x, y, 100, 200)
        } else if (distance < 4) {
            player.body.setVelocity(0, 0);
        }
    }

    update(time: number, delta: number) {
        if (this.me.active) {
            let vecX: Direction = 0;
            let vecY: Direction = 0;

            if (this.keyboard.D.isDown) {
                vecX = 1;
            }

            if (this.keyboard.A.isDown) {
                vecX = -1;
            }
            if (this.keyboard.W.isDown) {
                vecY = -1;
            }

            if (this.keyboard.S.isDown) {
                vecY = 1;
            }

            if (vecX !== 0 || vecY !== 0) {
                this.engine.move([vecX, vecY]);
            }
        }
    }
}
