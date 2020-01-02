import React, { useState } from 'react'


const Anecdote = ({ anecdote, title, votes }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{anecdote}</div>
      <div>has {votes} votes.</div>
    </div>
  )
}

const App = ({ anecdotes }) => {

  const getRandomIndex = (arrayLength) => {
    return Math.floor(Math.random() * Math.floor(arrayLength));
  }

  const getMostVotesIndex = (votes) => {
    let mostVotes = 0
    for (let n in votes) {
      const value = votes[n]
      if (value > mostVotes) {
        mostVotes = value
      }
    }

    return votes.indexOf(mostVotes)
  }

  const [selected, setSelected] = useState(getRandomIndex(anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const currentVote = votes[selected]
  const mostVotesIndex = getMostVotesIndex(votes)

  const mostVotedAnecdote = anecdotes[mostVotesIndex]
  const mostVotedAnecdoteVoteAmount = votes[mostVotesIndex]

  const addVote = () => {
    const nextVotes = [...votes]
    nextVotes[selected] += 1
    setVotes(nextVotes)
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} title="Anecdote of the day" votes={currentVote} />

      <br />
      <button onClick={() => { addVote() } }>
        Vote
      </button>
      <button onClick={() => setSelected(getRandomIndex(anecdotes.length))}>
        Next anecdote
      </button>
      <br />

      <Anecdote anecdote={mostVotedAnecdote} title="Anecdote with most votes" votes={mostVotedAnecdoteVoteAmount} />
    </div>
  )
}

export default App;
