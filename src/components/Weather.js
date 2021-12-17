import React, { useState } from 'react';
import CityWeather from './CityWeather';
import './Weather.css';

export default function Weather() {
  // Create Use State hook for Search
  const [searchTerm, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  // eventhandler for input
  const handleChange = ({ target: { value } }) => {
    if (!value) setLoading(true);
    setSearch(value);
  };

  // Find Weather
  const searchWeather = url => {
    setLoading(true);
    fetch(url)
      .then(response => {
        // network failure, request prevented
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        return Promise.reject(new Error(response.statusText));
      })
      .then(response => response)
      .then(result => {
        // Will target css for corresponding weather, next task
        let weather = result?.weather[0];
        let data = {
          cityName: result.name,
          desc: weather.description,
          temperature: Math.round(result.main.temp),
          icon: weather.icon
        };

        // retrive weather info
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        // common error
        console.error(`Error in fetch: ${error}`);
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
              placeholder="Search by city or zip code"
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
        {weatherData.cityName && !loading && (
          <div className="display-weather">
            {weatherData.cityName && (
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
