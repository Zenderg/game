import {BehaviorSubject, Observable} from "rxjs";
import {GameState, Player, Vector} from "../../../server/src/models/main";


export class Engine {
    private ws: any;

    state$: BehaviorSubject<GameState>

    constructor() {
        this.ws = new WebSocket('ws://localhost:4000');

        this.ws.on('INIT', (state: GameState) => {
            this.state$ = new BehaviorSubject<GameState>(state);
            this.ws.emit('SPAWN');
        });

        this.ws.on('STATE_UPDATED', (data) => {
            this.state$.next(data);
            // console.log(data);
        });
    }

    move(vector: Vector) {
        this.ws.send({action: 'MOVE', data: {vector}})
    }
}
