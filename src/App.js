import Weather from "./app-component/weather.component";
import 'weather-icons/css/weather-icons.css'
import React, { Component } from "react";


// api call api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_key = "08d049aa2e64e568138bde85fdcd929e";

class App extends React.Component {
  constructor() {
    super()
    this.state = {};
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_key}`);
    const response = await api_call.json();

    console.log(response)
  }
  render() {
    return (
      <div className="App">
        <Weather />
      </div>
    )
  }
}

export default App;