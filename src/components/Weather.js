import React, { useState } from 'react';
import CityWeather from './CityWeather';
import './Weather.css';

export default function Weather() {
  // Create Use State hook for Search
  const [searchTerm, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState({});

  // eventhandler for input
  const handleChange = evt => {
    // console.log(evt.target.value);

    // Saves the search variable
    setSearch(evt.target.value);
  };

  // Find Weather
  const searchWeather = url => {
    fetch(url)
      .then(response => {
        // network failure, request prevented
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        return Promise.reject(new Error(response.statusText));
      })
      .then(response => {
        // console.log(response);
        return response;
      })
      .then(result => {
        // Will target css for corresponding weather, next task
        let data = {
          cityName: result.name,
          desc: result.weather[0].description,
          temperature: Math.round(result.main.temp),
          icon: result.weather[0].icon
        };
        // console.log(data);
        // retrive weather info
        setWeatherData(data);

        // custom result
        // console.log('result.body', result);
      })
      .catch(error => {
        // common error
        return null;
      });
  };

  // Eventhandler for search-submission
  const handleSubmit = evt => {
    evt.preventDefault();
    let query = isNaN(parseInt(searchTerm, 10)) ? 'q' : 'zip';
    let key = process.env.REACT_APP_WEATHERKEY;
    let url = `http://api.openweathermap.org/data/2.5/weather?${query}=${searchTerm}&units=imperial&appid=${key}`;
    searchWeather(url);
  };

  return (
    <div className="weather-container">
      <div>
        {/* header container */}
        <div className="header">
          <header>The Weather</header>
        </div>
      </div>
      <div className="search-container">
        {/* form container for search */}
        <div className="search-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
              id="search"
              placeholder="Search The Weather"
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={handleChange}
            />
            <button id="submit" text="submit" type="submit">
              Search
            </button>
          </form>
        </div>
        {weatherData.cityName !== null && (
          <div className="display-weather">
            {weatherData.cityName != null && (
              <CityWeather
                cityName={weatherData.cityName}
                desc={weatherData.desc}
                temperature={weatherData.temperature}
                weatherIcon={weatherData.icon}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
