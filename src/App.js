import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SightingsList from './SightingsList';

// Test data for sightings
const sightings = [
  {"id":"1","species":"gadwall","description":"All your ducks are belong to us","dateTime":"2016-10-01T01:01:00Z","count":1},
  {"id":"2","species":"lesser scaup","description":"This is awesome","dateTime":"2016-12-13T12:05:00Z","count":5},
  {"id":"3","species":"canvasback","description":"...","dateTime":"2016-11-30T23:59:00Z","count":2},
  {"id":"4","species":"mallard","description":"Getting tired","dateTime":"2016-11-29T00:00:00Z","count":18},
  {"id":"5","species":"redhead","description":"I think this one is called Alfred J.","dateTime":"2016-11-29T10:00:01Z","count":1},
  {"id":"6","species":"redhead","description":"If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.","dateTime":"2016-12-01T13:59:00Z","count":1},
  {"id":"7","species":"mallard","description":"Too many ducks to be counted","dateTime":"2016-12-12T12:12:12Z","count":100},
  {"id":"8","species":"canvasback","description":"KWAAK!!!1","dateTime":"2016-12-11T01:01:00Z","count":5}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <SightingsList sightings={sightings} />
        </p>
      </div>
    );
  }
}

export default App;
