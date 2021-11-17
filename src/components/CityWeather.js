import React from 'react'
import './CityWeather.css'

export default function CityWeather(props) {
    return (
        <div className="weather-holder">
            <div className="city-name">
                <h2>{props.cityName}</h2>
            </div>
            <div className="weather-content">
                <ul>
                    <li>{props.desc}</li>
                    <li>{props.temperature}</li>
                    <li>
                        <img src={`http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
