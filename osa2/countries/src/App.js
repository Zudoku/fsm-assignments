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
    <div></div>
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

  useEffect(refreshCountries, [])

  return (
    <div>
      <CountryFilter />
      <CountryList />
    </div>
  );
}

export default App;
