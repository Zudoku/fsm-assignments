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
            <Part part={props.part1} />
            <Part part={props.part2} />
            <Part part={props.part3} />
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Number of exercises {props.part1.amountOfExercises + props.part2.amountOfExercises + props.part3.amountOfExercises}
        </p>

    )
}

const App = () => {
    const course = 'Half Stack application development'

    const part1 = {
        partName: 'Fundamentals of React',
        amountOfExercises: 10
    }
    const part2 = {
        partName: 'Using props to pass data',
        amountOfExercises: 7
    }
    const part3 = {
        partName: 'State of a component',
        amountOfExercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total part1={part1} part2={part2} part3={part3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))