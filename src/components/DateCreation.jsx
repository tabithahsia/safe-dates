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

  momentChange(m){
    this.setState({m})
  }

  dummy(){}

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
          {/* <div className="form-group col-6 col-sm-6 col-md-3">
            <label>Date</label>
            <input name="date" 
              type="date" 
              onChange={this.handleChange.bind(this)} 
              value={this.state.date}
              className="form-control"
            />
          </div> */}
          <div className="form-group col-6 col-sm-6 col-md-3">
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
                onSave={this.dummy.bind(this)}
                minStep={15} // default
                name='moment'
              />
            </div>
          </div> 
          <div className="form-group col-6 col-sm-6 col-md-3">
            <label>Address/Name of venue</label>
            <PlacesAutocomplete
              inputProps={inputProps}
              classNames={cssClasses}
              name="location"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        {/* <TimePicker 
              defaultValue={moment()} 
              showSecond={false} 
              minuteStep={15}
              use12Hours  
            /> */}
      </div>
    );
  }
}

export default DateCreation;
