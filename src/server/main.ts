// import WebSocket from "ws";
// import {Vector} from "./models/main";


import {Actions, CharacterEnum, GameState, Player} from "../shared/models/main";
import {interval} from "rxjs";

const server = require('http').createServer();
const io = require('socket.io')(server);

const user: Player = {
    character: CharacterEnum.archer,
    health: 100,
    id: 667,
    name: 'Anna',
    position: {x: 300, y: 300},
    speed: 8,
}
const cat: Player = {
    character: CharacterEnum.archer,
    health: 100,
    id: 123,
    name: 'Cat',
    position: {x: 400, y: 400},
    speed: 1,
}


io.on('connection', (client: any) => {
    client.on(Actions.MOVE, (message: any) => {
        const {data, token} = message;
        const {vector} = data;
        const [x,y]: [number, number] = vector;
        const {speed} = user;

        user.position.x += x*speed;
        user.position.y += y*speed;
    });

    interval(10).subscribe(r => {
        if(cat.position.x > user.position.x) {
            cat.position.x--;
        } else if(cat.position.x < user.position.x) {
            cat.position.x++;
        }

        if(cat.position.y > user.position.y) {
            cat.position.y--;
        } else if(cat.position.y < user.position.y) {
            cat.position.y++;
        }

        const newGameState: GameState = {
            me: user,
            players: [cat]
        };

        client.emit(Actions.UPDATE, newGameState)
    })

});
server.listen(4000);

// const wss = new WebSocket.Server({ port: 4000 });
// console.log('Server started on port 4000')
// wss.on('connection', function connection(ws: any) {
//     ws.on('message', (message: any) => {
//         const {data, action} = JSON.parse(message);
//
//         console.log(data, action);
//         switch (action) {
//             case 'MOVE':
//                 console.log(data.vector)
//                 break;
//         }
//     });
//
//     ws.send('something');
// });
