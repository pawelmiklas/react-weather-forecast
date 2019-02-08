import React, { Component } from 'react';
import './App.css';
import SearchForm from "./components/SearchForm/SearchForm";
import WeatherResult from "./components/WeatherResult/WeatherResult";
import {debounce} from 'lodash';

class App extends Component {  
  state = {
    inputValue: '',
    description: '',
    temp: '',
    show: '',
    iconName: '',
    id: '',
    background: '',
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.inputValue !== this.state.inputValue){
      this.setState({
        inputValue: this.state.inputValue,
      })

      const APIKey = `90d17c63781cd2f5d64915cb6f21ae86`;
      const api = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&APPID=${APIKey}&units=metric`;

      fetch(api)
        .then(response => {
          if(response.ok){
            this.setState({
              show: true
            })
            return response;
          }
          throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            description: data.weather[0].description,
            temp: data.main.temp,
            mainDesc: data.weather[0].main,
            show: true,
            id: data.weather[0].id
          }, () => {
            const { id } = this.state;
            let weatherGroup;
            if(id === 800){
              this.setState({
                iconName: 'CLEAR_DAY',
                background: 'yellow'
              })
            } else if(id !== 800){
              weatherGroup = id.toString()[0];
            switch (weatherGroup) {
              case "8":
                return(
                  this.setState({
                    iconName: 'PARTLY_CLOUDY_DAY',
                    background: 'gray'
                  })
                )
              case "3":
                return(
                  this.setState({
                    iconName: 'RAIN',
                    background: 'blue'
                  })
                )
              case "5":
                return(
                  this.setState({
                    iconName: 'RAIN',
                    background: 'blue'
                  })
                )
              case "2":
                return(
                  this.setState({
                    iconName: 'RAIN',
                    background: 'blue'
                  })
                )
              case "6":
                return(
                  this.setState({
                    iconName: 'SNOW',
                    background: 'gray'
                  })
                )
              case "7":
                return(
                  this.setState({
                    iconName: 'FOG',
                    background: 'gray'
                  })
                )
              default:
                return null
            }
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


  
  handleUpdateValue = debounce((e) => {
    this.setState({
      inputValue: e,
      show: ''
    })
  },1000)

  render() {
    return (
      <main className={`main ${this.state.background}`}>
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
