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

    // https://reactjs.org/docs/handling-events.html
    this.handleClick = this.handleClick.bind(this);
    this.saveOld = this.saveOld.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h1>UCSB</h1>
        <h2>UCSB JS Working Group</h2>
        <h3>use Kevin's api for employee id translation </h3>

        <form id="employeeid-in">
          <label htmlFor="old">{this.state.old}</label>
          <input type="text" id="old" onChange={this.saveOld} />
          <button onClick={this.handleClick}>Go</button>
        </form>
        <h3>{this.state.new}</h3>
      </div>
    );
  }

  // https://reactjs.org/docs/lifting-state-up.html
  saveOld(event) {
    this.setState({ old: event.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    const secretApiKey = "U7TushNJS7AGrt8nucft8FqfVdwvRlsB";
    const ucsbApiEndpoint = `https://test.api.ucsb.edu/employees/employeemap/v1/?id=${
      this.state.old
    }`;
    console.log(JSON.stringify(ucsbApiEndpoint));
    const options = {
      method: "GET",
      headers: { "ucsb-api-key": secretApiKey }
    };

    //this.setState({ new: "9876543" }); // stubbing a response until we can solve fetch issues

    // fetch best-practice on querystring values.
    // https://github.com/github/fetch/issues/256#issuecomment-170228674
    fetch(ucsbApiEndpoint, options)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(JSON.stringify(json));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
