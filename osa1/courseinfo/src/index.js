import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.partName} {props.part.amountOfExercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Number of exercises {props.parts[0].amountOfExercises + props.parts[1].amountOfExercises + props.parts[2].amountOfExercises}
        </p>

    )
}

const App = () => {
    const course = 'Half Stack application development'

    const parts = [
        {
            partName: 'Fundamentals of React',
            amountOfExercises: 10
        },
        {
            partName: 'Using props to pass data',
            amountOfExercises: 7
        },
        {
            partName: 'State of a component',
            amountOfExercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))