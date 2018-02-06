import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from 'moment';
import InputMoment from 'input-moment'; 
import 'input-moment/dist/input-moment.css';
import { format, parse } from 'libphonenumber-js';

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
    }
    this.locationChange = this.locationChange.bind(this);
    this.locationSelect = this.locationSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.momentChange = this.momentChange.bind(this);
    this.momentSave = this.momentSave.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    console.log({ ...this.state, m: this.state.m.format() });
  }

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  locationChange(location) {
    this.setState({ location });
  }

  locationSelect(location, placeId) {
    const that = this;  
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15
    });
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ placeId }, (place, status) => {
      // console.log(place)
      // console.log(status);
      if (place.international_phone_number) {
        that.setState({
          location,
          locationNumber: place.international_phone_number
        })
      } else {
        that.setState({
          numberFound: false,
          locationNumber: 'Google cannot find a phone number for this place; please enter manually'
        })
      }
    })
  }

  clearInput() {
    this.setState({ locationNumber: '' })
  }

  momentChange(m) {
    this.setState({ m })
  }
  // TODO
  momentSave() {
    this.setState({ momentSaved: true })
  }

  render() {
    const _state = this.state; 
    const inputProps = {
      value: _state.location,
      onChange: this.locationChange,
      type: 'search',
      placeholder: 'Search restaurants and bars...'
    };
    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container'
    }
    const opts = {};
    if (!_state.numberFound) {
      if (!_state.locationNumber) {
        opts.placeholder = 'Google cannot find a phone number for this place; please enter manually';
      }
    } else {
      opts.readOnly = 'readOnly';
    }
    const dateTimeStyle = _state.momentSaved ? { backgroundColor: '#98fb98' } : {};
    const locationNumberStyle = _state.numberFound ? {} : { height: 'auto' };

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-xs-12 col-sm-6">
            <label htmlFor="date-time">Date and Time
              <input
                name="date-time"
                id="date-time"
                style={dateTimeStyle}
                value={_state.m.format('llll')}
                className="form-control"
                readOnly
              />
            </label>
            <div style={{ backgroundColor: 'white' }}> 
              <InputMoment
                moment={_state.m}
                onChange={this.momentChange}
                onSave={this.momentSave}
                minStep={15} // default
                name="moment"
              />
            </div>
          </div>
          <div className="form-group col-xs-12 col-sm-6">
            <label htmlFor="address-location">Address/Name of venue
              <PlacesAutocomplete
                inputProps={inputProps}
                classNames={cssClasses}
                onSelect={this.locationSelect}
                name="location"
              />
              <div id="map" />
              <textarea
                name="locationNumber"
                value={_state.locationNumber}
                className="form-control"
                onFocus={this.clearInput}
                onChange={this.handleChange}
                style={locationNumberStyle}
                {...opts}
              />
            </label>
          </div>
          <Button
            type="submit"
            value="Submit"
            disabled={_state.locationNumber === '' || _state.locationNumber.length === 71}
          > Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default DateCreation;
