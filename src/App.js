import React, { Component } from "react";
import classnames from "classnames";
import "./App.css";

const VBARS = 20;

const Bar = ({ n }) => (
  <div className="bar">
    {Array.from({ length: VBARS }).map((_, idx) => (
      <div key={idx} className={classnames('tick', {
        active: n > (idx * 50),
        low: idx < 5,
        mid: idx >= 5 && idx < 15,
        high: idx >= 15
      })} />
    ))}
  </div>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      bars: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.addEventListener("message", mess => {
      this.setState({
        bars: mess.data
          .split(";")
          .filter(n => n !== "")
          .map(n => parseInt(n, 10))
      });
    });
  }
  componentWillUnmount() {
    this.socket.close();
  }
  render() {
    const { bars } = this.state;
    return (
      <div className="App">
        {bars.map((n, idx) => (
          <Bar key={idx} n={n} />
        ))}
      </div>
    );
  }
}

export default App;
