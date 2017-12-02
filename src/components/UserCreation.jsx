import React from 'react';

class UserCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      race: '',
      height: '',
      gender: ''
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Phone #:
            <input type="tel" placeholder="(888)888-8888" onChange={e => this.setState({ phoneNumber: e.target.value })} />
            <br/>
            Gender:
            <select value = {this.state.gender} onChange={e => this.setState({ gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <br/>
            Race:
            <select value = {this.state.race} onChange={e => this.setState({ race: e.target.value })}>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="asian">Asian</option>
              <option value="pacificIslander">Pacific Islander</option>
              <option value="latino">Hispanic/Latino</option>
            </select>
            <br/>
            Height:
            <input type="text" placeholder="5ft 5in" onChange={e => this.setSTate({height: e.target.value})}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default UserCreation;
