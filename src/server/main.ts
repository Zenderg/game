import {Actions, CharacterEnum, GameState, Player} from "../shared/models/main";
import {interval} from "rxjs";
import Socket = SocketIOClient.Socket;

const express = require('express');
const app = express()
const path = require('path');
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', express.static(path.resolve(__dirname + '/../../dist')));


const io = require('socket.io')(server);


class Game {
    players: {
        [key:string] : Player
    } = {};

    sockets: {
        [key:string]: Socket
    } = {}

    constructor() {
        io.on('connection', (socket: Socket) => {
            this.addPlayer(socket);

            interval(30).subscribe((r: any) => {
              this.update()
            })
        });


    }

    update() {
        const playersArray = Object.values(this.players);
        Object.values(this.sockets).forEach((socket: Socket) => {
            const newGameState: GameState = {
                me: this.players[socket.id],
                players: playersArray.filter(it => it.id !== socket.id).map(it => ({...it, name: 'Cat'})).slice(0, 2)
            };

            socket.emit(Actions.UPDATE, newGameState)
        })
    }

    handleAction() {

    }


    addPlayer(socket: Socket) {
        const id = socket.id;
        this.sockets[id] = socket;

        this.players[id] = {
            character: CharacterEnum.archer,
            health: 100,
            id: id,
            name: 'Anna',
            position: {x: 300, y: 300},
            speed: 4,
        };
        console.log(id);

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
