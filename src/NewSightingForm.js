import React, { Component } from 'react';
import $ from 'jquery';

// test data for possible species
const species = [{"name":"mallard"},{"name":"redhead"},{"name":"gadwall"},{"name":"canvasback"},{"name":"lesser scaup"}];

/* Component to display new entry form and submit the data */
class NewSightingForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  // override form submitting to disable redirecting
  submitForm(e) {
    e.preventDefault();
    const data = {
      species: $('#speciesSelect').val(),
      description: $('#descriptionText').val(),
      dateTime: $('#dateInput').val() + 'T' + $('#timeInput').val() + ':00Z',
      count: $('#countNumber').val(),
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
              <select className="custom-select" id="speciesSelect" required>
                <option value="">Species...</option>
                {species.map((entry) => <option key={entry.name} value={entry.name}>{entry.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dateInput" className="col-form-label col-4 col-md-2">Date</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <input className="form-control" type="date" id="dateInput" required />
            </div>
            <label htmlFor="timeInput" className="col-form-label col-4 col-md-2">Time</label>
            <div className="col-7 col-sm-5 col-md-4 col-lg-2">
              <input className="form-control" type="time" id="timeInput" required />
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