import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TimePicker from 'rc-time-picker';;

class DateCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date:'',
      time: '',
      location: ''
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

  locationChange(address){
    this.setState({location: address })
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


    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-6 col-sm-6 col-md-3">
            <label>Date</label>
            <input name="date" 
              type="date" 
              onChange={this.handleChange.bind(this)} 
              value={this.state.date}
              className="form-control"
            />
          </div>
          <div className="form-group col-6 col-sm-6 col-md-3">
            <label>Time</label>
            <input name="time" 
              type="time" 
              onChange={this.handleChange.bind(this)} 
              value={this.state.time}
              className="form-control"
            />
          </div> 
          <div className="form-group col-6 col-sm-6 col-md-3">
            <label>Address/Name of venue</label>
            {/* <input name="location" 
              type="text" 
              onChange={this.handleChange.bind(this)} 
              value={this.state.location}
            /> */}
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={cssClasses}
              name="location"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateCreation;
