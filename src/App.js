import React, { Component } from 'react';
import Fetch  from './fetcher-component/fetch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render () {
    return (
      <div className="App">
        <Fetch />
      </div>
    );
  }
}

export default App;
