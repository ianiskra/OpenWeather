import React, { useState } from 'react'
import CityWeather from './CityWeather'
import './Weather.css'

export default function Weather() {
    // Create Search State
    const [searchTerm, setSearch] = useState("")
    const [weatherData, setWeatherData] = useState({})

    // eventhandler for input
    const handleChange = (evt) => {
        console.log(evt.target.value)

        // Saves the search variable
        setSearch(evt.target.value)
    }

    // Find Weather 
    const searchWeather = (url) => {
        fetch(url).then(response => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }


            return Promise.reject(new Error(response.statusText));
        })
            .then(response => {
                console.log(response)
                return response
            })
            .then(result => {
                let data = {
                    cityName: result.name,
                    desc: result.weather[0].description,
                    temperature: Math.round(result.main.temp),
                    icon: result.weather[0].icon
                }
                console.log(data)
                // retrive weather info
                setWeatherData(data)

                // custom result
                console.log('result.body', result)
            })
            .catch(error => {
                // common error
                return null;
            });
    }

    // Eventhandle for search-submission
    const handleSubmit = (evt) => {
        evt.preventDefault()

        let key = process.env.REACT_APP_WEATHERKEY
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${key}`
        searchWeather(url)
        // api.openweathermap.org/data/2.5/weather?q=Chicago&appid=
    }

    return (
        <div className="weather-container">
            <div>
                {/* header container */}
                <div className="header">
                    <header>My Header</header>
                </div>
            </div>
            <div className="search-container">
                {/* form container for search */}
                <div className="search">
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="search" >Search</label>
                        <input id="search" type="text" name="searchTerm" value={searchTerm} onChange={handleChange} />
                        <button text="submit">Submit</button>
                    </form>
                </div>
                {weatherData.cityName !== null &&
                    <div className="display-weather">
                        <CityWeather
                            cityName={weatherData.cityName}
                            desc={weatherData.desc}
                            temperature={weatherData.temperature}
                            weatherIcon={weatherData.icon}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
