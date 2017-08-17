import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/spin.css';
import './styles/uikit.css';
import Search from './search.component.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search /> 
      </div>
    );
  }
}

export default App;
