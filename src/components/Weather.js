import React, { useEffect, useState } from "react";
import CityWeather from "./CityWeather";
import useFetch from "./hooks/useFetch";
import "./Weather.css";

export default function Weather() {
  // Create Use State hook for Search
  const [searchTerm, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { result, loading } = useFetch(url);

  useEffect(() => {
    console.log("result: ", result);
  }, [result]);
  // eventhandler for input
  const handleChange = (e) => {
    // e.preventDefault();
    setSearch(e.target.value);
  };

  // Eventhandler for search-submission
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let query = isNotANumber(searchTerm) ? "q" : "zip";

    let key = process.env.REACT_APP_WEATHERKEY;
    let url = `http://api.openweathermap.org/data/2.5/weather?${query}=${searchTerm}&units=imperial&appid=${key}`;
    setUrl(url);
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
        {result?.weather?.length && (
          <div className="display-weather">
            <CityWeather
              sunrise={new Date(
                result?.sys?.sunrise * 1000
              ).toLocaleTimeString()}
              sunset={new Date(result?.sys?.sunset * 1000).toLocaleTimeString()}
              feelsLike={result?.main?.feels_like}
              min={result?.main?.temp_min}
              max={result?.main?.temp_max}
              loading={loading}
              cityName={result.name}
              temperature={result?.main?.temp}
              weatherIcon={result?.weather[0]?.icon}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function isNotANumber(value) {
  return isNaN(parseInt(value, 10));
}
