import React, { Component } from 'react';

// test data for possible species
const species = [{"name":"mallard"},{"name":"redhead"},{"name":"gadwall"},{"name":"canvasback"},{"name":"lesser scaup"}];

/* Component to display new entry form and submit the data */
class NewSightingForm extends Component {
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <label htmlFor="speciesSelect" className="col-form-label col-4 col-md-2">Species</label>
            <div className="col-7 col-sm-4 col-md-3 col-lg-2">
              <select className="custom-select" id="speciesSelect" defaultValue="0">
                <option value="0">Species...</option>
                {species.map((entry) => <option key={entry.name} value={entry.name}>{entry.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dateInput" className="col-form-label col-4 col-md-2">Date</label>
            <div className="col-7 col-sm-4 col-md-3 col-lg-2">
              <input className="form-control" type="date" id="dateInput" />
            </div>
            <div className="col-sm-4 col-md-auto" style={{ padding: 0 }} ></div>
            <label htmlFor="timeInput" className="col-form-label col-4 col-md-2">Time</label>
            <div className="col-7 col-sm-4 col-md-3 col-lg-2">
              <input className="form-control" type="time" id="timeInput" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="descriptionText" className="col-form-label col-4 col-md-2">Description</label>
            <div className="col-12 col-sm-8 col-lg-6">
              <textarea className="form-control" id="descriptionText" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="countNumber" className="col-form-label col-4 col-md-2">Count</label>
            <div className="col-7 col-sm-4 col-md-3 col-lg-2">
              <input className="form-control" type="number" id="countNumber" defaultValue="0" />
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewSightingForm;