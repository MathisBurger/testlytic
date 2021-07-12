import {Websocket} from "../src/services/Websocket";

export interface AppState {
    url: string;
    inputText: string;
    outputText: string;
    websocket?: Websocket;
    connected: boolean;
}
