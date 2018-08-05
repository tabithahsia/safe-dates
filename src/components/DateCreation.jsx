import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';
import InputMoment from 'input-moment'; 
import 'input-moment/dist/input-moment.css';
import { isValidNumber, format, parse } from 'libphonenumber-js';

class DateCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // date:'',
      // time: '',
      m: moment(),
      location: '',
      locationNumber: '',
      // loading: false,
      numberFound: true,
      momentSaved: false,
      submitHover: false
    }
    this.locationChange = this.locationChange.bind(this);
    this.locationSelect = this.locationSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.momentChange = this.momentChange.bind(this);
    this.momentSave = this.momentSave.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHoverHandler = this.submitHoverHandler.bind(this);
  }

  // componentDidUpdate() {
  //   console.log({ ...this.state, m: this.state.m.format() });
  // }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/date/', {
      m: this.state.m.utc(),
      location: this.state.location,
      locationNumber: format(parse(this.state.locationNumber, 'US'), 'E.164') 
    }).then(data => {
      if (data.data) {
        window.location = '/';
        alert('Date alert saved!');
      } else {
        alert('There was an error, please check your inputs');
      }
    })
  }

  submitHoverHandler() {
    this.setState({ submitHover: !this.state.submitHover });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  locationChange(location) {
    this.setState({ location });
  }

  locationSelect(location, placeId) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15
    });
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId }, (place, status) => {
      // console.log(place)
      // console.log(status);
      if (place.international_phone_number) {
        this.setState({
          location,
          locationNumber: place.international_phone_number
        });
      } else {
        this.setState({
          numberFound: false,
          locationNumber: 'Google cannot find a phone number for this place; please enter manually'
        });
      }
    });
  }

  clearInput() {
    this.setState({ locationNumber: '' });
  }

  momentChange(m) {
    this.setState({ m });
  }
  // TODO
  momentSave() {
    this.setState({ momentSaved: true });
  }

  render() {
    const inputProps = {
      value: this.state.location,
      onChange: this.locationChange,
      type: 'search',
      placeholder: 'Search restaurants and bars...'
    };
    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }
    const opts = {};
    if (!this.state.numberFound) {
      if (!this.state.locationNumber) {
        opts.placeholder = 'Google cannot find a phone number for this place; please enter manually';
      }
    } else {
      opts.readOnly = 'readOnly';
    }
    // styles
    const dateTimeStyle = this.state.momentSaved ? { backgroundColor: '#98fb98' } : {};
    const locationNumberStyle = this.state.numberFound ? {} : { height: 'auto', width: '100%' };
    const flexContainerStyle = { display: 'flex' };
    const flexItemStyle = { flex: 1 };

    return (
      <div>
        <form onSubmit={this.handleSubmit} style={flexContainerStyle}>
          <div className="form-group col-xs-12 col-sm-6" style={flexItemStyle}>
            <label htmlFor="date-time">Date and Time
              <input
                name="date-time"
                id="date-time"
                style={dateTimeStyle}
                value={this.state.m.format('llll')}
                className="form-control"
                readOnly
              />
            </label>
            <div style={{ backgroundColor: 'white' }}>
              <InputMoment
                moment={this.state.m}
                onChange={this.momentChange}
                onSave={this.momentSave}
                minStep={15} // default
                name="moment"
              />
            </div>
          </div>
          <div className="form-group col-xs-12 col-sm-6" style={flexItemStyle}>
            <label htmlFor="address-location" style={{ width: '100%' }}>Address/Name of venue
              <PlacesAutocomplete
                inputProps={inputProps}
                classNames={cssClasses}
                onSelect={this.locationSelect}
                name="location"
              />
              <div id="map" />
              <textarea
                name="locationNumber"
                value={this.state.locationNumber}
                className="form-control"
                onFocus={this.clearInput}
                onChange={this.handleChange}
                style={locationNumberStyle}
                {...opts}
              />
              {
                !this.state.location && this.state.submitHover ?
                  <Alert bsStyle="warning">
                    Please enter name of the restaurant/bar/etc ...
                  </Alert> : null
              }
              {
                !isValidNumber(this.state.locationNumber, 'US') && this.state.submitHover && this.state.locationNumber && this.state.locationNumber.length !== 71 ?
                  <Alert bsStyle="warning">
                    Please enter a valid phone number
                  </Alert> : null
              }
            </label>
            <Button
              type="submit"
              value="Submit"
              onMouseEnter={this.submitHoverHandler}
              onMouseLeave={this.submitHoverHandler}
              style={{ position: 'absolute', bottom: 0, right: '15px' }}
              disabled={!isValidNumber(this.state.locationNumber, 'US')}
            > Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default DateCreation;
