import React, { Component } from 'react';
import $ from 'jquery';

/* Component to display new entry form and submit the data */
class NewSightingForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      species: [],
    }
  }

  componentDidMount() {
    this.fetchSpecies();
  }

  fetchSpecies() {
    fetch('http://localhost:8080/species', {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        species: responseJson.map(x => x.name),
      });
    });
  }

  // override form submitting to disable redirecting
  submitForm(e) {
    e.preventDefault();
    const data = {
      species: $('#speciesSelect').val(),
      description: $('#descriptionText').val(),
      dateTime: new Date($('#dateInput').val() + 'T' + $('#timeInput').val()).toISOString(),
      count: parseInt($('#countNumber').val(), 10),
    };
    fetch('http://localhost:8080/sightings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => this.onSubmitSuccess(response));
  }

  onSubmitSuccess(response) {
    location.reload(); // eslint-disable-line
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitForm}>
          <div className="form-group row">
            <label htmlFor="speciesSelect" className="col-form-label col-4 col-md-2">Species</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <select className="custom-select col-12" id="speciesSelect" required>
                <option value="">Species...</option>
                {this.state.species.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dateInput" className="col-form-label col-4 col-md-2">Date</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <input className="form-control" type="date" id="dateInput" defaultValue={new Date().toISOString().substr(0,10)} required />
            </div>
            <label htmlFor="timeInput" className="col-form-label col-4 col-md-2">Time</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <input className="form-control" type="time" id="timeInput" defaultValue={new Date().toTimeString().substr(0,5)} required />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="descriptionText" className="col-form-label col-4 col-md-2">Description</label>
            <div className="col-12 col-sm-8 col-md-10 col-lg-6">
              <textarea className="form-control" id="descriptionText" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="countNumber" className="col-form-label col-4 col-md-2">Count</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <input className="form-control" type="number" id="countNumber" defaultValue="1" min="1" required />
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewSightingForm;