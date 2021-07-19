import {w3cwebsocket} from "websocket";

export class Websocket {

    websocket: w3cwebsocket | undefined;


    constructor(url: string, errorHandler: any) {
        if (this.URLChecker(url)) {
            this.websocket = new w3cwebsocket(url);
            this.websocket.onerror = errorHandler;
        } else {
            this.websocket = undefined;
            errorHandler({
               name: "Invalid websocket URL",
               message: ""
            });
        }
    }

    // Checks weather the websocket url is valid or not.
    private URLChecker(url: string): boolean {
        if (url.includes("wss://") || url.includes("ws://")) {
            return !(url.includes("wss://") && url.includes("ws://"));
        }
        return false;
    }

    sendMessage(msg: string): void {
        if (this.websocket !== undefined) {
            this.websocket.send(msg);
        }
    }
}
