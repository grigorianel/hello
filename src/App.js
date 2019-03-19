import React, { Component } from 'react';
import DataJson from './data.json'


class App extends Component {
  render() {
    console.log(DataJson,1111);

    return (
      <div >
        <h1>This is table</h1>
      </div>
    );
  }
}

export default App;
