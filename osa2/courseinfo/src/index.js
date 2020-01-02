import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course.name}
        </h1>
    )
}

const Part = (props) => {
    const part = props.part
    return (
        <p>
            {part.partName} {part.amountOfExercises}
        </p>
    )
}

const Content = (props) => {
    const course = props.course
    return (
        <div>
            <Part part={course.parts[0]} />
            <Part part={course.parts[1]} />
            <Part part={course.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const course = props.course
    return (
        <p>
            Number of exercises {course.parts[0].amountOfExercises + course.parts[1].amountOfExercises + course.parts[2].amountOfExercises}
        </p>

    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))