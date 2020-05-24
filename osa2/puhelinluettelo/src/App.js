import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const personToRow = (person, onRemove) => (
  <div>
    {person.name}  {person.number} <button onClick={(e) => onRemove(person.id, person.name, e)}>Remove from contacts</button>
  </div>
)

const PhoneNumberList = ({ persons, onRemove }) => {
  return (
    <div>
      { persons.map(person => <div key={person.name}>{personToRow(person, onRemove)}</div>) }
    </div>
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

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        const createdPerson = response.data
        const newPersons = [ ...persons, createdPerson]
        setPersons(newPersons)
    })
    // Reset the form
    setNewName('')
    setNewNumber('')

    event.preventDefault()
  }

  const onRemovePerson = (id, name, e) => {
    const userConfirmation = window.confirm(`Remove ${name} from contacts?`)
    
    if (!userConfirmation) {
      return
    }

    personService
      .remove(id)
      .then(response => {
        const personsNow = persons.filter((x) => x.id !== id)
        setPersons(personsNow) 
      }) 
  }

  const filteredPersons = persons.filter((x) => {
    const comparedName = x.name.toLowerCase()
    const comparedPhoneNumber = x.number.toLowerCase()
    const filter = filteredText.toLowerCase()
    return comparedName.includes(filter) || comparedPhoneNumber.includes(filter)
  })

  const refreshPhoneNumbersEffect = () => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
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
      <PhoneNumberList 
        persons={filteredPersons} 
        onRemove={onRemovePerson} 
      />
    </div>
  )

}



export default App;
