import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PhoneNumberList = ({ persons }) => {
const personsToRows = () => persons.map(person => <div key={person.name}>{person.name}  {person.phoneNumber}</div>)
  return (
    <div>{personsToRows()}</div>
  )
}

const AddNumberForm = ({ newName, newNumber, onSubmit, onNameChanged, onNumberChanged}) => {
  return (
    <form onSubmit={onSubmit} >
        <div>
          name: 
          <input 
            onChange={onNameChanged}
            value={newName}
          />
        </div>
        <div>
          number: 
          <input 
            onChange={onNumberChanged}
            value={newNumber}
          />
        </div>
        <div>
          <button
            type="submit"
          >
            add
          </button>
        </div>
      </form>
  )
}

const FilterNumbersForm = ({ onChange }) => {
  return (
    <div>
      <div>Filter contacts with phone number or name:</div>
      <input type="text" onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredText, setFilteredText ] = useState('')

  const onSubmitAddNumber = (event) => {
    const foundPerson = persons.find( x => x.name.toLowerCase() === newName.toLowerCase())
    // Check if already found
    if (foundPerson !== undefined) {
      alert(`${newName} can already be found from the phonebook.`)
      event.preventDefault()
      return
    }
    // Check if either field is empty
    if (newName === "" || newNumber === "") {
      alert('Please fill out the form completely.')
      event.preventDefault()
      return
    }

    const newPresons = [ ...persons, {
      name: newName,
      phoneNumber: newNumber
    }]
    setPersons(newPresons)
    setNewName('')
    setNewNumber('')

    event.preventDefault()
  }

  const filteredPersons = persons.filter((x) => {
    const comparedName = x.name.toLowerCase()
    const comparedPhoneNumber = x.phoneNumber.toLowerCase()
    const filter = filteredText.toLowerCase()
    return comparedName.includes(filter) || comparedPhoneNumber.includes(filter)
  })

  const mapBackendPersonToFrontEndPerson = (person) => {
    return {
      name: person.name,
      phoneNumber: person.number
    }
  }

  const refreshPhoneNumbersEffect = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // Because the backend data structure is different from what we previously defined, we need to map it
        const fetchedPersons = response.data.map(person => mapBackendPersonToFrontEndPerson(person))
        setPersons(fetchedPersons)
      })
  }

  // Load phone number list initially
  useEffect(refreshPhoneNumbersEffect, [])

  return (
    <div>
      <h2>Add a contact</h2>
      <AddNumberForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={onSubmitAddNumber}
        onNameChanged={(event) => { setNewName(event.target.value) }}
        onNumberChanged={(event) => { setNewNumber(event.target.value) }}
      />
      <hr />
      <h2>Filter contacts</h2>
      <FilterNumbersForm onChange={(event) => setFilteredText(event.target.value)}/>
      <h2>Contacts</h2>
      <PhoneNumberList persons={filteredPersons} />
    </div>
  )

}



export default App;
