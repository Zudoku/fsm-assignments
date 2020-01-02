import React, { useState } from 'react';
import ReactDOM from 'react-dom'

const Button = ({ buttonText, onClick }) => {
  return (
    <button onClick={onClick}>
      {buttonText}
    </button>
  )
}

const FeedBack = ({ clickGood, clickNeutral, clickBad }) => {
  return (
    <div>
      <h2> Give feedback </h2>
      <Button buttonText="Good" onClick={clickGood} />
      <Button buttonText="Neutral" onClick={clickNeutral} />
      <Button buttonText="Bad" onClick={clickBad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h2> Statistics </h2>
      <div>
        Good {good}
      </div>
      <div>
        Neutral {neutral}
      </div>
      <div>
        Bad {bad}
      </div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedBack 
        clickGood={() => setGood(good + 1)}
        clickNeutral={() => setNeutral(neutral + 1)}
        clickBad={() => setBad(bad + 1)}
      />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
      />
    </div>
  )
}


export default App;
