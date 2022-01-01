import React from "react";
import "./CityWeather.css";
import LoadingSpinner from "./loadingSpinnerr";

export default function CityWeather({
  cityName,
  temperature,
  weatherIcon,
  loading,
  min,
  max,
  feelsLike,
  sunrise,
  sunset,
}) {
  const temp = Math.round(temperature);
  const low = Math.round(min);
  const high = Math.round(max);
  return (
    <>
      <div style={{ position: "relative", color: "white", textAlign: "left" }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h3>{cityName}</h3>
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="weather icon"
            />
          </>
        )}
        <h1 style={{ fontWeight: "300", fontSize: "80px" }}>{temp}ºF</h1>
        <span style={{ color: "f8f8f8", fontSize: "14px" }}>
          <span>
            L: <strong>{low}ºF</strong>&nbsp;|&nbsp;
          </span>
          <span>
            H: <strong>{high}ºF</strong>
          </span>
        </span>
      </div>
      <div style={{ color: "white", marginTop: "1rem", textAlign: "left" }}>
        <p>
          Feels like <strong>{Math.round(feelsLike)}ºF</strong>
        </p>
        <p>
          Sunrise: <strong>{sunrise.toLowerCase()}</strong>
        </p>
        <p>
          Sunset: <strong>{sunset.toLowerCase()}</strong>
        </p>
      </div>
    </>
  );
}
