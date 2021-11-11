import React, {useState} from 'react'

export default function Weather() {
    // Create Search State
    const [searchTerm, setSearch] = useState("")
    
    // eventhandler for input
    const handleChange = (evt) => {
      console.log(evt.target.value)

      // Saves the search variable
      setSearch(evt.target.value)
    }

    // Find Weather 
    const searchWeather = (url) => {
        fetch(url)
        .then(response => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }


            return Promise.reject(new Error(response.statusText));
        })
        .then(response => {
            console.log(response.json())
            return response.json()
        })
        .then(result => {
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

        let key = "fe761c68d2eb460e0483911fd05e80e5"
        let url = `api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${key}`
        searchWeather(url)
        // api.openweathermap.org/data/2.5/weather?q=Chicago&appid=fe761c68d2eb460e0483911fd05e80e5
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="search" >Search</label>
                <input id="search" type="text" name="searchTerm" value={searchTerm} onChange={handleChange} />
                <button text="submit">Submit</button>
            </form>
        </div>
    )
}
