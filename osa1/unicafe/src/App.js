import React, { useState } from 'react';

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

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const calculateAverage = (good, neutral, bad) => {
    const goodValues = good * 1
    const neutralValues = neutral * 0
    const badValues = bad * -1
    const valueAmount = good + neutral + bad
    return (goodValues + neutralValues + badValues) / valueAmount
  }

  const calculatePositive = (good, neutral, bad) => {
    const valueAmount = good + neutral + bad
    return '' + (good / valueAmount) * 100 + ' %'
  }

  const noValuesGiven = (good, neutral, bad) => {
    return good === 0 && neutral === 0 && bad === 0 
  }
  
  if (noValuesGiven(good, neutral, bad)) {
    return (
      <div>
        <h2> Statistics </h2>
        <div>
          No feedback given yet
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2> Statistics </h2>
      <table>
        <tbody>
          <Statistic text="Good" value={good}/>
          <Statistic text="Neutral" value={neutral}/>
          <Statistic text="Bad" value={bad}/>
          <Statistic text="All" value={good + neutral + bad}/>
          <Statistic text="Average" value={calculateAverage(good, neutral, bad)}/>
          <Statistic text="Positive" value={calculatePositive(good, neutral, bad)}/>
        </tbody>
      </table>
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
