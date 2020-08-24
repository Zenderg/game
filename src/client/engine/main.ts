import {BehaviorSubject, Subject} from "rxjs";
import {Actions, Degree, GameState, Player, Vector} from "../../shared/models/main";
import io from 'socket.io-client';

export class Engine {
    private ws: any;

    token: string;
    state$: BehaviorSubject<GameState>;
    newPlayer$ = new Subject<Player>();

    // state: GameState;
    queue = [];

    constructor() {
        this.ws = io(`ws://localhost:8000/`);
        this.init();
    }

    init() {
        this.ws.on(Actions.UPDATE, (gameState: GameState) => {
            // this.state$.next() = gameState;
            if(this.state$) {
                this.state$.next(gameState);
            } else {
                this.state$ = new BehaviorSubject<GameState>(gameState);
            }
        })
    }

    move(vector: Vector) {
        this.ws.emit(Actions.MOVE, {data: {vector}, token: this.token});
    }

    swordAttack(angle: Degree) {
        this.ws.emit(Actions.SWORD_ATTACK, {data: {angle}, token: this.token});
    }

    bowAttack(angle: Degree) {
        this.ws.emit(Actions.BOW_ATTACK, {data: {angle}, token: this.token});
    }
}
