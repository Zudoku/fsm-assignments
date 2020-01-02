import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course.name}
        </h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.amountOfExercises}
        </p>
    )
}

const Content = ({ course }) => {
    const parts = () => course.parts.map(part => 
        <Part key={part.id} part={part} />
    )
    return (
        <div>
            {parts()}
        </div>
    )
}

const Total = ({ course }) => {
    const amounts = course.parts.map(part => part.amountOfExercises)
    const finalAmount = amounts.reduce((previous, current) => previous + current, 0)
    return (
        <p>
            Number of exercises {finalAmount}
        </p>

    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                amountOfExercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                amountOfExercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                amountOfExercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))