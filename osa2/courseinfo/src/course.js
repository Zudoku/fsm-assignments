import React from 'react'

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
        <b>
            Total of {finalAmount} exercises.
        </b>
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

export default Course