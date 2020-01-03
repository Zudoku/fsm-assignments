import React, { useState } from 'react'

const PhoneNumberList = ({ persons }) => {
  const personsToRows = () => persons.map(person => <div key={person.name}>{person.name}</div>)
  return (
    <div>{personsToRows()}</div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const onSubmit = (event) => {
    const newPresons = [ ...persons, {
      name: newName
    }]
    setPersons(newPresons)
    setNewName('')

    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit} >
        <div>
          name: 
          <input 
            onChange={(event) => { setNewName(event.target.value) }}
            value={newName}
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
      <h2>Numbers</h2>
      <PhoneNumberList persons={persons} />
    </div>
  )

}



export default App;
