import React from "react";

function Results(props) {
  return (
    <table border="1" cellSpacing="0" cellPadding="3">
      <tr>
        <th>input</th>
        <th>output</th>
        <th>msg</th>
      </tr>
      {props.outputList.map((item, index) => (
        <tr key={index}>
          <td>{item.input}</td>
          <td>{item.output}</td>
          <td>{item.message}</td>
        </tr>
      ))}
    </table>
  );
}

// must "export default {Name}" to make it usable in the caller
export default Results;
