import React, { useState } from 'react'

const App = ({ anecdotes }) => {

  const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * Math.floor(arrayLength));
  }

  const [selected, setSelected] = useState(getRandomIndex(anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const currentVote = votes[selected]

  const addVote = () => {
    const nextVotes = [...votes]
    nextVotes[selected] += 1
    setVotes(nextVotes)
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        Has {currentVote}  votes.
      </div>
      <br />
      
      <button onClick={() => { addVote() } }>
        Vote
      </button>
      <button onClick={() => setSelected(getRandomIndex(anecdotes.length))}>
        Next anecdote
      </button>
    </div>
  )
}

export default App;
