import {Actions, CharacterEnum, GameState, Player} from "../shared/models/main";
import Socket = SocketIOClient.Socket;
import {interval} from "rxjs";

const express = require('express');
const app = express()
const path = require('path');
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', express.static(path.resolve(__dirname + '/../../dist')));


const io = require('socket.io')(server);

const playersDb = new Map();

class Game {
    players: {
        [key:string] : Player
    } = {};

    sockets: {
        [key:string]: Socket
    } = {}

    constructor() {
        interval(33).subscribe((r: any) => {
          this.update()
        })

        io.on('connection', (socket: Socket) => {
            socket.on(Actions.SIGN_IN, (message: any) => {
                const { token } = message;

                if(playersDb.has(token)){
                    this.addPlayer(socket, token);
                    const player = playersDb.get(token);
                    console.log(`[${player.name}]: <signed in>`);
                    socket.emit(Actions.LOGIN_SUCC, player.name);
                } else {
                    socket.emit(Actions.LOGIN_FAIL);
                    console.log('Login failed')
                }
            });
            socket.on(Actions.SIGN_UP, (message: any) => {
                console.log('signUp');
                const newToken = Math.random().toString(36).slice(2);
                const {name} = message;
                playersDb.set(newToken, {
                    character: CharacterEnum.archer,
                    health: 75,
                    maxHealth: 100,
                    id: newToken,
                    name: name,
                    position: {x: 300, y: 300},
                    speed: 4,
                });
                console.log(`[${name}]: <signed up>`);

                socket.emit(Actions.TOKEN, newToken);

                this.addPlayer(socket, newToken);

            })
        })
    }

    update() {
        const playersArray = Object.values(this.players);
        Object.values(this.sockets).forEach((socket: Socket) => {
            const newGameState: GameState = {
                me: this.players[socket.id],
                players: playersArray.filter(it => it.id !== socket.id).map(it => ({...it, name: 'Cat'})).slice(0, 2),
                arrows: []
            };

            socket.emit(Actions.UPDATE, newGameState)
        })
    }

    handleAction() {

    }


    addPlayer(socket: Socket, id: string) {
        socket.id = id;
        this.sockets[id] = socket;

        this.players[id] = playersDb.get(id);

        socket.on(Actions.MOVE, (message: any) => {
            const player = this.players[socket.id];

            const {data} = message;
            const {vector} = data;
            const [x,y]: [number, number] = vector;
            const {speed} = player;

            player.position.x += x*speed;
            player.position.y += y*speed;
        });

        socket.on('disconnect', () => this.removePlayer(socket));

    }

    removePlayer(socket: Socket) {
        console.log('remove', socket.id)
        delete this.players[socket.id];
        delete this.sockets[socket.id];
    }
}

new Game();
