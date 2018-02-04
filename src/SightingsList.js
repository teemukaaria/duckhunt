import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Component to display given sightings */
class SightingsList extends Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Species</th>
              <th>Description</th>
              <th>Time</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sightings.map((sight) => {
              return (
                <tr>
                  <td>{sight.species}</td>
                  <td>{sight.description}</td>
                  <td>{sight.dateTime}</td>
                  <td>{sight.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

SightingsList.propTypes = {
  sightings: PropTypes.arrayOf({
    id: PropTypes.number,
    species: PropTypes.string,
    description: PropTypes.string,
    dateTime: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
};

export default SightingsList;