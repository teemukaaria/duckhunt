import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Component to display given sightings */
class SightingsList extends Component {
  render() {
    const direction = (this.props.ordering.direction > 0) ? (<i className="fa fa-sort-down"></i>) : (<i className="fa fa-sort-up"></i>);
    return (
      <div>
        <table className="table table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th className="col-orderable" onClick={() => this.props.onOrderBy('species')}>
                Species {(this.props.ordering.field === 'species') ? direction : ''}
              </th>
              <th>Description</th>
              <th className="col-orderable" onClick={() => this.props.onOrderBy('time')}>
                Time {(this.props.ordering.field === 'time') ? direction : ''}
              </th>
              <th className="col-orderable" onClick={() => this.props.onOrderBy('count')}>
                Count {(this.props.ordering.field === 'count') ? direction : ''}
              </th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.sightings.map((sight) => {
                const location = (sight.latitude !== null && sight.longitude !== null) ? `${sight.latitude} ${sight.longitude}`: '';
                return (
                  <tr key={sight.id}>
                    <td>{sight.species}</td>
                    <td>{sight.description}</td>
                    <td>{new Date(sight.dateTime).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</td>
                    <td>{sight.count}</td>
                    <td>
                      <a href={"https://www.google.fi/maps/place/" + location} target="_blank">
                        {location}
                      </a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

SightingsList.propTypes = {
  sightings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      species: PropTypes.string,
      description: PropTypes.string,
      dateTime: PropTypes.string,
      count: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
  onOrderBy: PropTypes.func.isRequired,
  ordering: PropTypes.shape({
    field: PropTypes.string,
    direction: PropTypes.number,
  }).isRequired,
};

export default SightingsList;