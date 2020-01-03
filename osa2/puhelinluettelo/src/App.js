import React, { useState } from 'react'

const PhoneNumberList = ({ persons }) => {
  const personsToRows = () => persons.map(person => <div key={person.name}>{person.name}</div>)
  return (
    <div>{personsToRows()}</div>
  )
}

const AddNumberForm = ({ onSubmit, onNameChanged, onNumberChanged}) => {
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
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const onSubmitAddNumber = (event) => {
    const foundPerson = persons.find( x => x.name.toLowerCase() === newName.toLowerCase())
    if (foundPerson !== undefined) {
      alert(`${newName} can already be found from the phonebook.`)
      event.preventDefault()
      return
    }

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
      <AddNumberForm
        onSubmit={onSubmitAddNumber}
        onNameChanged={(event) => { setNewName(event.target.value) }} 
      />
      <h2>Numbers</h2>
      <PhoneNumberList persons={persons} />
    </div>
  )

}



export default App;
