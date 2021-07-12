import React, {ChangeEvent} from "react";
import "./App.css";
import {IOCard} from "./components/IO-Card";
import {AppState} from "../typings/App";
import {Websocket} from "./services/Websocket";
import {IMessage, IMessageEvent} from "websocket";

export default class App extends React.Component<any, AppState> {

    state: AppState = {
        inputText: "",
        outputText: "",
        url: "",
        connected: false
    };

    constructor(props: any) {
        super(props);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.messageReciver = this.messageReciver.bind(this);
    }

    // Handles the message traffic coming from
    // the active websocket connection.
    messageReciver(event: IMessageEvent): void {
        this.setState({outputText: event.data as string});
    }

    // Opens an connection an calls itself recursively every 5ms
    // if the connection is not completely established.
    openConnection(waiting: boolean = false, ws: Websocket | undefined = undefined): void {
        if (!waiting) {
            let ws = new Websocket(this.state.url);
            ws.websocket.onmessage = this.messageReciver;
            setTimeout(() => {
                this.openConnection(true, ws);
            }, 5);
        } else {
            if (ws && ws?.websocket.readyState === 1) {
               this.setState({websocket: ws as Websocket, connected: true});
            } else {
                setTimeout(() => {
                    this.openConnection(true, ws);
                }, 5);
            }
        }
    }

    // Closes the active websocket connection
    closeConnection(): void {
        this.state.websocket?.websocket.close();
        this.setState({connected: false});
    }

    // This method is given to children components
    // for changing the input values in this component.
    changeInputValue(val: string): void {
        this.setState({inputText: val});
    }

    // Handles the process of sending messages
    // trough the active websocket connection
    sendMessage(): void {
        if (this.state.websocket === undefined){
            alert("No active websocket connection");
        } else {
            (this.state.websocket as Websocket).sendMessage(this.state.inputText);
        }
    }

  render() {
    return (
      <div className="container">
        <div className="url-input">
          <input type="text" placeholder="websocket url" onChange={
              (e: ChangeEvent<HTMLInputElement>) => this.setState({url: e.target.value})
          } />
          <button
              onClick={
                  this.state.connected ? () => this.closeConnection() : () => this.openConnection()
              }
              style={{
                  background: this.state.connected ? "#c91919" : "#241688",
                  borderColor: this.state.connected ? "#9a1313" : "#342888"
              }}
          >
              {this.state.connected ? "close" : "open"}
          </button>
        </div>
        <div className="card-box">
            <IOCard
                heading="Input:"
                value={""}
                valueChanger={this.changeInputValue}
                sender={this.sendMessage}
            />
            <IOCard heading="Output:" value={this.state.outputText} />
        </div>
      </div>
    );
  }
}
