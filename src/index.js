import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      new: ""
    };
  }

  render() {
    return (
      <div className="App">
        <h1>UCSB</h1>
        <h2>UCSB JS Working Group</h2>
        <h3>use kevin's api for employee id translation </h3>

        <form id="employeeid-in">
          <label htmlFor="old" />
          <input type="text" id="old" />
          <button onclick={() => this.handleClick}>Go</button>
        </form>
      </div>
    );
  }
}

function handleClick(e) {
  const secretApiKey = "U7TushNJS7AGrt8nucft8FqfVdwvRlsB";
  const ucsbApiEndpoint =
    "https://test.api.ucsb.edu/employees/employeemap/v1/?id=";
  const apiHeaders = { headers: { "ucsb-api-key": secretApiKey } };

  fetch(ucsbApiEndpoint, apiHeaders)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
