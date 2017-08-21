import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import logo from './logo.svg';
import './styles/spin.css';

class Search extends Component { 
constructor() {
    super();

    this.state = {
        zipcode: '',
        forecast: '',
        isLoading: false, 
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
    this.setState({ isLoading: true })
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
            forecast: forecastByZip,
            isLoading: false, 
        })
    })
    .catch(err => {
        throw new Error(err)
    })
}

render() { 
    if (this.state.isLoading) {
    return (
        <div className="uk-position-center">
            <img src={logo} alt="React logo" className="App-logo" />
        </div> 
    )} else {
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
    )}}
}

export default Search; 