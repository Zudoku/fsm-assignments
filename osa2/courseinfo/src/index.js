import React from 'react'
import ReactDOM from 'react-dom'
import Course from './course'


const CoursesList = ({ courses }) => {
    const coursesList = () => courses.map(course => 
        <Course key={course.name} course={course} />
    )
    

    return (
        <div>
            {coursesList()}
        </div>
    )
}

const App = () => {
    const courses = [
        {
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
        },
        {
            name: 'Node.js',
            parts: [
              {
                name: 'Routing',
                amountOfExercises: 3,
                id: 1
              },
              {
                name: 'Middlewares',
                amountOfExercises: 7,
                id: 2
              }
            ]
          }
    ]

    return (
        <div>
            <CoursesList courses={courses} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))