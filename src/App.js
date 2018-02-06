import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SightingsView from './SightingsView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#sightings">Sightings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#submit">Submit</a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="sightings" className="tab-pane fade active show">
              <SightingsView />
            </div>
            <div id="submit" className="tab-pane fade">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
