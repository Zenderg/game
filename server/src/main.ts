import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws: any) {
    ws.on('message', function incoming(message: any) {
        console.log('received: %s', message);
    });

    ws.send('something');
});
