import React, { Component } from 'react';
import SightingsList from './SightingsList';

/* Component to fetch, order and filter sightings */
class SightingsView extends Component {
  constructor(props) {
    super(props);
    this.fetchSightings = this.fetchSightings.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.getSightings = this.getSightings.bind(this);

    this.state = {
      status: 'nodata',
      sightings: undefined,
      ordering: {
        field: 'time',
        direction: -1,
      }
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

  orderBy(field) {
    const newDirection = (this.state.ordering.field === field) ? this.state.ordering.direction * -1 : 1;
    this.setState({
      ordering: {
        field: field,
        direction: newDirection,
      }
    });
  }

  getSightings() {
    const directionMulti = this.state.ordering.direction;
    function compare(a, b) {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    }
    switch (this.state.ordering.field) {
      case 'time':
        return this.state.sightings.sort((a, b) => compare(a.dateTime, b.dateTime) * directionMulti);
      case 'species':
        return this.state.sightings.sort((a, b) => compare(a.species, b.species) * directionMulti);
      case 'count':
        return this.state.sightings.sort((a, b) => compare(a.count, b.count) * directionMulti);
      default:
        return this.state.sightings;
    }
  }

  render() {
    return (
      <div>
        <SightingsList
          sightings={(this.state.status === 'data') ? this.getSightings() : []}
          ordering={this.state.ordering}
          onOrderBy={this.orderBy}
        />
      </div>
    );
  }
}

export default SightingsView;