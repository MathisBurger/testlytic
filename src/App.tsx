import React from "react";
import "./App.css";
import {IOCard} from "./components/IO-Card";

export default class App extends React.Component<any, any> {

  render() {
    return (
      <div className="container">
        <div className="url-input">
          <input type="text" placeholder="websocket url" />
          <button>open</button>
        </div>
        <div className="card-box">
            <IOCard heading="Input:"  value={""}/>
            <IOCard heading="Output:" value={""} />
        </div>
      </div>
    );
  }
}
