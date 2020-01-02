import React, { useState } from 'react';
import ReactDOM from 'react-dom'

const FeedBack = (props) => {
  return (
    <h2> Give feedback </h2>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedBack/>
    </div>
  )
}


export default App;
