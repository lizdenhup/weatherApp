import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import logo from './logo.svg';
import './styles/spin.css';
import Modal from 'react-modal';

class Search extends Component { 
constructor(props) {
    super(props);

    this.state = {
        zipcode: '',
        forecast: '',
        isLoading: false, 
        modalIsOpen: false, 
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
    fetch(`/api/v1/search?query=${this.state.zipcode}`, {
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
            modalIsOpen: true, 
        })
    })
    .catch(err => {
        alert('Something went wrong. Please try again.')
        window.location.reload(true);
    })
}

openModal = () => this.setState({modalIsOpen: true})
closeModal = () => 
this.setState({
    modalIsOpen: false,
    zipcode: "",
    forecast: "",
})

render() { 
    const modalStyle = {
        overlay: {
          "position": "absolute",
          "overflow": "auto",
          "minHeight": "825px",
        }
    }  
    if (this.state.isLoading) {
    return (
        <div className="uk-position-center">
            <img src={logo} alt="React logo" className="App-logo" />
        </div> 
    )} else if (this.state.forecast !== "" && this.state.zipcode !== "") {
        var forecastTime = this.state.forecast.forecast.txt_forecast.date || ""
        var forecastDay = this.state.forecast.forecast.txt_forecast.forecastday || ""
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                contentLabel="Modal"
                onRequestClose={this.closeModal}
                style={modalStyle}>
                <h2>Forecast for {this.state.zipcode}</h2>
                <p>Current as of {forecastTime}</p> 
                <p>{forecastDay[0]['title']}: {forecastDay[0]['fcttext']}</p>
                <p>{forecastDay[1]['title']}: {forecastDay[1]['fcttext']}</p>
                <p>{forecastDay[2]['title']}: {forecastDay[2]['fcttext']}</p>
                <p>{forecastDay[3]['title']}: {forecastDay[3]['fcttext']}</p>
                <p>{forecastDay[4]['title']}: {forecastDay[4]['fcttext']}</p>
                <p>{forecastDay[5]['title']}: {forecastDay[5]['fcttext']}</p>
                <button type="button" className="uk-button uk-margin-top uk-margin-right uk-button-secondary uk-position-top-right" onClick={this.closeModal}>X</button>
            </Modal> 
        )
    } else {
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
        </div> 
    )}}
}

export default Search; 