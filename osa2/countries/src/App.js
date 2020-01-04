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

const CountryList = () => {
  return (
    <div>list of 2...10</div>
  )
}

const CountryInformation = () => {
  return (
    <div>information about 1</div>
  )
}

const CountryInformationContainer = ({ filteredCountries }) => {

  const broadFilterContent = () => {
    return (
      <div>Filter too broad, please be more specific</div>
    )
  }

  const noCountriesFoundContent = () => {
    return (
      <div>No such countries found</div>
    )
  }

  const listContent = () => {
    return (
      <CountryList />
    )
  }

  const articleContent = () => {
    return (
      <CountryInformation />
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

  // Fetch countries at the start
  useEffect(refreshCountries, [])

  return (
    <div>
      <CountryFilter
        onChangeFilter={(event) => setFilter(event.target.value)}
        filterValue={filter}
      />
      <CountryInformationContainer
        filteredCountries={filteredCountries}
      />
    </div>
  );
}

export default App;
