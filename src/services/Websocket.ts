import {w3cwebsocket} from "websocket";

export class Websocket {

    websocket: w3cwebsocket;

    constructor(url: string) {
        this.websocket = new w3cwebsocket(url);
    }

    sendMessage(msg: string): void {
        this.websocket.send(msg);
    }
}
