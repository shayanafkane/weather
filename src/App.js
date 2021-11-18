import Weather from "./app-component/weather.component";
import 'weather-icons/css/weather-icons.css'
import React, { Component } from "react";


// api call api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_key = "08d049aa2e64e568138bde85fdcd929e";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.getWeather();

    this.weathericone={
      Thunderstorm : "wi-thunderstorm"
    }
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }
  getWeather = async () => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_key}`);
    const response = await api_call.json();

    console.log(response)

    this.setState({
      city: response.name,
      country: response.sys.country,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description  ,
      icon : this.weathericone.Thunderstorm

    });
  }
  render() {
    return (
      <div className="App">
        <Weather city={this.state.city} country={this.state.country} celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min}
          description={this.state.description} weathericone={this.state.icon}/>
      </div>
    )
  }
}

export default App;