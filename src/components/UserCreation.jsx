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
            <input type="tel" placeholder="(888) 888-8888" onChange={e => this.setState({ phoneNumber: e.target.value })} />
          </label>
        </form>
      </div>
    );
  }
}

export default UserCreation;
