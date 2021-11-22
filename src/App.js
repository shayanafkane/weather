import Weather from "./app-component/weather.component";
import 'weather-icons/css/weather-icons.css'
import React, { Component } from "react";
import Form from "./app-component/form.component";


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

    this.weathericone = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  get_WeatherIcon(icons, reangeId) {
    switch (true) {
      case reangeId >= 200 && reangeId <= 232:
        this.setState({ icon: this.weathericone.Thunderstorm })
        break;
      case reangeId >= 300 && reangeId <= 321:
        this.setState({ icon: this.weathericone.Drizzle })
        break;
      case reangeId >= 500 && reangeId <= 531:
        this.setState({ icon: this.weathericone.Rain })
        break;
      case reangeId >= 600 && reangeId <= 622:
        this.setState({ icon: this.weathericone.Snow })
        break;
      case reangeId >= 701 && reangeId <= 781:
        this.setState({ icon: this.weathericone.Atmosphere })
        break;
      case reangeId === 800:
        this.setState({ icon: this.weathericone.Clear })
        break;
      case reangeId >= 800 && reangeId <= 804:
        this.setState({ icon: this.weathericone.Clouds })
        break;
      default:
        this.setState({ icon: this.weathericone.Clouds })
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    if (city) {

      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response)

      this.setState({
        city: response.name,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,


      });
      this.get_WeatherIcon(this.weathericone, response.weather[0].id);
    } else {
      this.setState({
        error: true
      })
    }
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };

  }
  render() {
    return (
      <div className="App">
        <div className="container mt-5 mb-4">
          <div>{this.state.error ? error() : null}</div>
          <form onSubmit={this.getWeather}>
            <div className="row">
              <div className="col-md-6">
                <input type="text" className="form-control" name="city" autoComplete="off" placeholder="Enter the name of the city" />
              </div>

              <div className="col-md-6 mt-md-0 text-md-left d-flex justify-content-center">
                <button className="btn btn-warning">Get Weather</button>
              </div>
            </div>
          </form>
        </div>

        <Weather city={this.state.city} country={this.state.country} celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min}
          description={this.state.description} weathericone={this.state.icon} />
      </div>
    )
  }
}



function error() {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Pleace Enter City
    </div>
  )
}
export default App;