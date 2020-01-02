import React, { useState } from 'react'

const App = ({ anecdotes }) => {

  const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * Math.floor(arrayLength));
  }

  const [selected, setSelected] = useState(getRandomIndex(anecdotes.length))

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <br />
      
      <button onClick={() => setSelected(getRandomIndex(anecdotes.length))}>
        Next anecdote
      </button>
    </div>
  )
}

export default App;
