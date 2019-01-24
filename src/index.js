import React from "react";
import ReactDOM from "react-dom";
import Results from "./Results";

import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      new: [],
      message: "Enter an employee ID and click Go"
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
        <textarea
          id="old"
          onChange={this.saveOld}
          value={this.state.old}
          rows="10"
        />
        <br />
        <button onClick={this.handleClick}>Go</button>
        <h3>
          <Results outputList={this.state.new} />
        </h3>
        <h4>{this.state.message}</h4>
      </div>
    );
  }

  // https://reactjs.org/docs/lifting-state-up.html
  saveOld(event) {
    this.setState({ old: event.target.value });
  }

  handleClick(e) {
    //console.log("The link was clicked.");
    const secretApiKey = "U7TushNJS7AGrt8nucft8FqfVdwvRlsB";
    const ucsbApiEndpoint = `https://test.api.ucsb.edu/employees/employeemap/v1/?id=${
      this.state.old
    }`;

    //console.log(JSON.stringify(ucsbApiEndpoint));

    const ids = this.state.old.split("\n");

    const data = { id: ids };

    const options = {
      method: "POST",
      headers: {
        "ucsb-api-key": secretApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    // fetch best-practice on querystring values.
    // https://github.com/github/fetch/issues/256#issuecomment-170228674
    fetch(ucsbApiEndpoint, options)
      .then(res => {
        return res.json();
      })
      .then(json => {
        const outputList = json.map(item =>
          // This is how to return an object via map().
          ({
            input: item.InputId,
            output: item.OutputId,
            message: item.errorMsg.Message
          })
        );

        // Next time loop over array and save that in "new"
        this.setState({
          new: outputList
        });

        console.log(JSON.stringify(json));
        console.log(JSON.stringify(outputList));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
