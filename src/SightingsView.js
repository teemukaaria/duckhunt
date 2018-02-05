import React, { Component } from 'react';
import SightingsList from './SightingsList';

/* Component to fetch, order and filter sightings */
class SightingsView extends Component {
  constructor(props) {
    super(props);
    this.fetchSightings = this.fetchSightings.bind(this);

    this.state = {
      status: 'nodata',
      sightings: undefined,
    };
  }

  componentDidMount() {
    this.fetchSightings();
  }

  // fetch sightings data from backend
  fetchSightings() {
    fetch('http://localhost:8080/sightings')
    .then(response => response.json())
    .then((responseJSON) => {
      this.setState({
        sightings: responseJSON,
        status: 'data',
      });
    })
    .catch((err) => {
      this.setState({
        status: 'error',
      });
    });
  }

  render() {
    return (
      <div>
        <SightingsList sightings={(this.state.status === 'data') ? this.state.sightings : []} />
      </div>
    );
  }
}

export default SightingsView;