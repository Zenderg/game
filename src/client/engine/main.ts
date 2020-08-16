import {BehaviorSubject} from "rxjs";
import {Actions, GameState, Vector} from "../../shared/models/main";
import io from 'socket.io-client';

export class Engine {
    private ws: any;

    token: string;
    // state$: BehaviorSubject<GameState>;
    state: GameState;

    constructor() {
        this.ws = io('ws://localhost:4000');
        this.init();
    }

    init() {
        this.ws.on(Actions.UPDATE, (gameState: GameState) => {
            this.state = gameState;
            // if(this.state$) {
            //     this.state$.next(gameState);
            // } else {
            //     this.state$ = new BehaviorSubject<GameState>(gameState);
            // }
        })
    }

    move(vector: Vector) {
        this.ws.emit(Actions.MOVE, {data: {vector}, token: this.token})
    }
}
