import React, { Component } from 'react'
import logo from './logo.svg';
import './styles/spin.css';

class Search extends Component { 

render() {
    return (
        <div className="uk-position-center">
        <p>Enter a zip code to check that area's weather conditions</p>
        <form>
        <input 
          className="uk-input uk-form-width-medium"
          type="text"
          name="zipcode"
          label="Zip code"
          />
          <button className="uk-button uk-button-default" type="submit">Check the weather</button>
        </form>
        </div> 
        )
    }
}

export default Search; 