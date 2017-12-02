import React from 'react';

class UserCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      race: '',
      height: ''
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Phone #:
            <input type="tel" placeholder="(888)888-8888" onChange={e => this.setState({ phoneNumber: e.target.value })} />
            Race:
            <select value = {this.state.race} onChange={e => this.setState({ race: e.target.value })}>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="asian">Asian</option>
              <option value="pacificIslander">Pacific Islander</option>
              <option value="latino">Hispanic/Latino</option>
            </select>
            Height:
              

          </label>
        </form>
      </div>
    );
  }
}

export default UserCreation;
