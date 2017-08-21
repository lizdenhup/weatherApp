import React, { Component } from 'react'
import logo from './logo.svg';
import './styles/spin.css';
import fetch from 'isomorphic-fetch'

class Search extends Component { 
constructor() {
    super();

    this.state = {
        zipcode: '',
        forecast: ''
        //resp is coming in, pare down what you want from the resp to use in disp with a guard statemtnt 
        //ie resp[0] || ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({
        zipcode: event.target.value
    })
}

handleSubmit(event) {
    event.preventDefault(); 
    return fetch(`/api/v1/search?query=${this.state.zipcode}`, {
    method: 'GET',
    headers: {
        "Accept": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(resp => {
        const forecastByZip = resp; 
        this.setState({ 
            forecast: forecastByZip
        })
    })
    .catch(err => {
        throw new Error(err)
    })
}

render() {

    return (
        <div className="uk-position-center">
        <p>Enter a zip code to check that area's weather conditions</p>
        <form onSubmit={this.handleSubmit}>
        <input 
          className="uk-input uk-form-width-medium"
          type="text"
          value = {this.state.zipcode}
          name="zipcode"
          onChange = {this.handleChange}
          label="Zip code"
          />
          <button className="uk-button uk-button-default" type="submit">Check the weather</button>
        </form>
            <div>
                {this.state.zipcode}
            </div>
        </div> 
        )
    }
}

export default Search; 