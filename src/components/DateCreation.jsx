import React from 'react';

class DateCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date
      time: '',
      location: ''
    }
  }

  render() {
    return (
      <div>
        <form>
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
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default DateCreation;
