import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from '../history/history';

class UserCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      race: 'White',
      height: '',
      gender: 'Male'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateComplete();
    const newState = this.state;
    newState.userComplete = true;
    axios.put('/api/user/', newState).then(data => {
      if (data.data) {
        history.push({ pathname: '/' });
      } else {
        alert('There was an error, please check your inputs');
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user-creation">
            Phone #:
            <input type="tel" placeholder="(888)888-8888" onChange={e => this.setState({ phoneNumber: e.target.value })} />
            <br />
            Gender:
            <select value={this.state.gender} onChange={e => this.setState({ gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <br />
            Race:
            <select value={this.state.race} onChange={e => this.setState({ race: e.target.value })}>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="asian">Asian</option>
              <option value="pacificIslander">Pacific Islander</option>
              <option value="latino">Hispanic/Latino</option>
            </select>
            <br />
            Height:
            <input type="text" placeholder="5ft 5in" onChange={e => this.setState({ height: e.target.value })} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

UserCreation.propTypes = {
  updateComplete: PropTypes.func.isRequired,
};

export default UserCreation;
