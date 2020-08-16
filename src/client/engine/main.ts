import {BehaviorSubject} from "rxjs";
import {Actions, GameState, Vector} from "../../shared/models/main";
import io from 'socket.io-client';

export class Engine {
    private ws: any;

    token: string;
    state$: BehaviorSubject<GameState>;
    // state: GameState;
    queue = [];

    constructor() {
        this.ws = io('ws://localhost:4000');
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

        // setInterval(() => {
        //     const vector = this.queue[0];
        //     if(vector) {
        //     }
        //     this.queue = [];
        // }, 100);
    }

    move(vector: Vector) {
        this.ws.emit(Actions.MOVE, {data: {vector}, token: this.token});

        // this.queue.push(vector);
    }
}
