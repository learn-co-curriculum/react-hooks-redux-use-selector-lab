import React, { Component } from 'react';
import UserInput from './components/UserInput'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <UserInput store={this.props.store}/>
        {/* is there something we could connect to here? */}
      </div>
    );
  }
}

export default App;
