import {BehaviorSubject, Subject} from "rxjs";
import {Actions, CharacterEnum, Degree, GameState, Player, Vector} from "../../shared/models/main";
import io from 'socket.io-client';
import {take} from "rxjs/operators";

export class Engine {
    private static instance: Engine;

    private ws: any;

    token: string | null;
    state$: BehaviorSubject<GameState>;
    newPlayer$ = new Subject<Player>();

    // state: GameState;
    queue = [];

    constructor() {;
    }

    public static getInstance(): Engine {
        if (!Engine.instance) {
            Engine.instance = new Engine();
        }

        return Engine.instance;
    }

    spawn(): Promise<any> {
        // this.ws.emit(Actions.SPAWN, {token: this.token})


        return new Promise((resolve => {
            this.subscribeToUpdates().then(() => {
                this.state$.pipe(take(1)).subscribe(r => {
                    resolve();
                })
            });

        }))
    }

    init(): Promise<any> {
        return  new Promise((resolve => {
            const token = localStorage.getItem('token');
            this.token = token;

            if(token) {
                // this.signIn(token)
                resolve(token);

            } else {
                // this.signUp(username);
                resolve(null);
            }

        }));

    }

    signUp(name: string): Promise<any> {
        return new Promise((resolve => {
            this.ws = io(`ws://localhost:8000/`);
            this.ws.on('connect', () => {
                console.log('sadasdasdasd')
                this.ws.emit(Actions.SIGN_UP, {name})
            })
            this.ws.on(Actions.TOKEN, (token: string) => {
                localStorage.setItem('token', token);
                resolve();
            })
        }))

    }

    signIn(token: string): Promise<any> {
        return new Promise((resolve => {
            this.ws = io(`ws://localhost:8000/`);
            this.ws.on('connect', () => {
                this.ws.emit(Actions.SIGN_IN, {token})
            });
            this.ws.on(Actions.LOGIN_FAIL, (token: string) => {
                localStorage.removeItem('token');
                window.location = window.location;
            })
            this.ws.on(Actions.LOGIN_SUCC, (username: string) => {
                resolve(username)
            });
        }))


    }

    subscribeToUpdates(): Promise<any> {
        return new Promise((resolve => {
            this.ws.on(Actions.UPDATE, (gameState: GameState) => {
                if(this.state$){
                    this.state$.next(gameState);
                } else {
                    this.state$ = new BehaviorSubject<GameState>(gameState);
                    resolve();
                }
            })
        }))

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
