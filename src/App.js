import React, { Component } from 'react';
import './App.css';
import SearchForm from "./components/SearchForm/SearchForm";
import WeatherResult from "./components/WeatherResult/WeatherResult";

class App extends Component {
  state = {
    inputValue: '',
    description: '',
    temp: '',
    show: false,
    iconName: '',
    typingTimeout: 0
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.inputValue !== this.state.inputValue){
      this.setState({
        inputValue: this.state.inputValue
      })

      const APIKey = `90d17c63781cd2f5d64915cb6f21ae86`;
      const api = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&APPID=${APIKey}&units=metric`;

      fetch(api)
        .then(response => {
          if(response.ok){
            return response;
          }
          throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            description: data.weather[0].description,
            temp: data.main.temp,
            show: true
          }, () => {
            const {description} = this.state;
            switch (description) {
              case "clear sky":
                return(
                  this.setState({
                    iconName: 'CLEAR_DAY'
                  })
                )
              case "few clouds":
                return(
                  this.setState({
                    iconName: 'PARTLY_CLOUDY_DAY'
                  })
                )
              case "scattered clouds":
                return(
                  this.setState({
                    iconName: 'CLOUDY'
                  })
                )
              case "broken clouds":
                return(
                  this.setState({
                    iconName: 'PARTLY_CLOUDY_DAY'
                  })
                )
              case "shower rain":
                return(
                  this.setState({
                    iconName: 'RAIN'
                  })
                )
              case "rain":
                return(
                  this.setState({
                    iconName: 'RAIN'
                  })
                )
              case "thunderstorm":
                return(
                  this.setState({
                    iconName: 'RAIN'
                  })
                )
              case "snow":
                return(
                  this.setState({
                    iconName: 'SNOW'
                  })
                )
              case "mist":
                return(
                  this.setState({
                    iconName: 'FOG'
                  })
                )
              default:
                return null
            }
          })
        })
        .catch(err => {
          this.setState({
            show: false
          })
        })
    }
  }

  handleUpdateValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <main className="main">
        <SearchForm
          change={this.handleUpdateValue}
        />
        <WeatherResult
          values={this.state}
        />
      </main>
    );
  }
}

export default App;
