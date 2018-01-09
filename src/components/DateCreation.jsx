import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import InputMoment from 'input-moment'; 
import 'input-moment/dist/input-moment.css';
import moment from 'moment';

class DateCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // date:'',
      // time: '',
      m:moment(),
      location: '',
      locationNumber: '',
      loading: false,
      numberFound: true
    }
    this.locationChange = this.locationChange.bind(this)
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/date/', this.state).then(data =>{
      if (data.data){
        window.location="/"
        alert('Date alert saved!')
      } else {
        alert("There was an error, please check your inputs")
      }
    })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  locationChange(location){
    this.setState({location })
  }

  locationSelect(location, placeId){
    let that = this;  
    let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });
    let service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId}, (place, status) => {
      // console.log(place)
      console.log(status)
      if (place.international_phone_number){
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

  clearInput(){
    this.setState({locationNumber: ''})
  }

  momentChange(m){
    this.setState({m})
  }
  //TODO
  momentSave(){}

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
    var opts = {};
    if (!this.state.numberFound){
      if (!this.state.locationNumber){
        opts['placeholder'] = 'Google cannot find a phone number for this place; please enter manually'; 
      }
    } else {
      opts['readOnly'] = 'readOnly';
    } 

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-xs-12 col-sm-6">
            <label>Date and Time</label>
            <input name="date-time" 
              value={this.state.m.format('llll')}
              className="form-control"
              readOnly
            />
           <div style={{backgroundColor:'white'}}> 
              <InputMoment
                moment={this.state.m}
                onChange={this.momentChange.bind(this)}
                onSave={this.momentSave.bind(this)}
                minStep={15} // default
                name='moment'
              />
            </div>
          </div> 
          <div className="form-group col-xs-12 col-sm-6">
            <label>Address/Name of venue</label>
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={cssClasses}
              onSelect={this.locationSelect.bind(this)}
              name="location"
            />
            <div id='map'></div>
            <input name="locationNumber" 
              value={this.state.locationNumber}
              className="form-control"
              onFocus={this.clearInput.bind(this)}
              onChange={this.handleChange.bind(this)}
              {...opts} 
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateCreation;
