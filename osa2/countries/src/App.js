import React, { useState, useEffect } from 'react';
import axios from 'axios'


const CountryFilter = ({ onChangeFilter, filterValue }) => {
  return (
    <div>
      <div>Find countries by name:</div>
      <input type="text" onChange={onChangeFilter} value={filterValue}/>
    </div>
  )
}

const CountryListRow = ({ country, onClick }) => {
  return (
  <div>
    {country.name}
    <button onClick={onClick} >Select</button>
  </div>
  )
}

const CountryList = ({ countries, onClickCountry }) => {

  const renderRows = () => {
    return countries.map(x => 
      <CountryListRow 
        key={x.alpha2Code}
        onClick={(event) => onClickCountry(event, x.name)}
        country={x}
      />
    )
  }

  return (
    <div>{renderRows()}</div>
  )
}

const CountryInformation = ({ country }) => {

  const weatherStackApiKey = process.env.REACT_APP_API_KEY
  const [capitalWeatherTemperature, setCapitalWeatherTemperature] = useState([])

  const refreshCapitalWeather = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${country.capital}`)
    .then((response) => {
      setCapitalWeatherTemperature(response.data.current)
    })
}

  useEffect(refreshCapitalWeather, [])

  const renderLanguageRows = () => {
    return country.languages.map(x => <li key={x.name} >{x.name} ({x.nativeName})</li>)
  }

  const renderWeatherDescriptionRows = () => {
    const descriptions = capitalWeatherTemperature.weather_descriptions
    if (descriptions === undefined) {
      return <div></div>
    } else {
      return descriptions.map(x => <div key={x}>{x}</div>)
    }
  }

  const renderTemperature = () => {
    if (Array.isArray(capitalWeatherTemperature)) {
      return <div></div>
    } else {
      return <div>Temperature: {capitalWeatherTemperature.temperature} C, feels like: {capitalWeatherTemperature.feelslike} C</div>
    }
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div><br/>
      <div>Population: {country.population}</div><br/>
      <div>This country is located in: {country.region} ({country.subregion})</div><br/>
      <b>Languages: </b><br/>
      <ul>
        {renderLanguageRows()}
      </ul>
      <img src={country.flag} alt={country.name} width="200px" />
      <h3>Weather in {country.name}'s capital, {country.capital}</h3>
      <div>
        {renderTemperature()}
      </div><br/>
      <div>
        {renderWeatherDescriptionRows()}
      </div>
    </div>
  )
}

const CountryInformationContainer = ({ filteredCountries, onClickCountryList }) => {

  const broadFilterContent = () => {
    return (
      <div>Filter too broad, please be more specific!</div>
    )
  }

  const noCountriesFoundContent = () => {
    return (
      <div>No such country found :(</div>
    )
  }

  const listContent = () => {
    return (
      <CountryList countries={filteredCountries} onClickCountry={onClickCountryList} />
    )
  }

  const articleContent = () => {
    return (
      <CountryInformation country={filteredCountries[0]}/>
    )
  }

  const renderContent = () => {
    if (filteredCountries.length === 1) {
      return articleContent()
    } else if (filteredCountries.length === 0) {
      return noCountriesFoundContent()
    } else if (filteredCountries.length <= 10) {
      return listContent()
    } else {
      return broadFilterContent()
    }
  }

  return (
    <div>{renderContent()}</div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  const refreshCountries = () => {
      axios.get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data)
      })
  }

  const filteredCountries = countries.filter(x => {
    const comparedCountry = x.name.toLowerCase()
    const filterValue = filter.toLowerCase()
    return comparedCountry.includes(filterValue)
  })

  const onClickCountryList = (event, countryName) => {
    setFilter(countryName)
    event.preventDefault()
  }

  // Fetch countries at the start
  useEffect(refreshCountries, [])

  return (
    <div>
      <CountryFilter
        onChangeFilter={(event) => setFilter(event.target.value)}
        filterValue={filter}
      />
      <hr />
      <CountryInformationContainer
        filteredCountries={filteredCountries}
        onClickCountryList={onClickCountryList}
      />
    </div>
  );
}

export default App;
