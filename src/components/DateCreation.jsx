import React from 'react';
import axios from 'axios';

class DateCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date:'',
      time: '',
      location: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Date:
            <br/>
            <input id="date" type="date" onChange={e => this.setState({ date: e.target.value })} />
            <br/>
            Time:
            <br/>
            <input id="time" type="time" onChange={e => this.setState({time: e.target.value })} />
            Address:
            <input id="address" type="text" onChange={e => this.setState({location: e.target.value})} />
            PhoneNumber:
            <br/>
            <input id="phoneNumber" type="text" onChange={e => this.setState({phoneNumber: e.target.value})} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateCreation;
