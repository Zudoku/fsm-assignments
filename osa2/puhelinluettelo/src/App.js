import React, { useState } from 'react'

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

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arttu Siren', phoneNumber: '+358-40-40404040' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNumberForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={onSubmitAddNumber}
        onNameChanged={(event) => { setNewName(event.target.value) }}
        onNumberChanged={(event) => { setNewNumber(event.target.value) }}
      />
      <h2>Numbers</h2>
      <PhoneNumberList persons={persons} />
    </div>
  )

}



export default App;
