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
                    <li className="desc">{props.desc}</li>
                    <li className="desc">{props.temperature}&deg; F</li>
                    {/* disable default icon at landing page */}
                    {props.weatherIcon != null &&                     
                    <li className="desc-img">
                        <img src={`http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`} alt="weather icon"/>
                    </li>
                    }

                </ul>
            </div>
        </div>
    )
}
