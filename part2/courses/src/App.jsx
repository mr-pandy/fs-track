import { useState } from "react";

import "./App.css";

const Header = ({ courseName }) => <h1>{courseName}</h1>;
const Part = ({ partName, partExercises, partId }) => (
  <p>
    {partName} : {partExercises}
  </p>
);
const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header courseName={course.name} />
            <Content courseContent={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

const Content = ({ courseContent }) => {
  const totalExercises = courseContent.reduce((sum, content) => {
    return sum + content.exercises;
  }, 0);

  return (
    <div>
      {courseContent.map((content) => (
        <Part
          key={content.id}
          partName={content.name}
          partExercises={content.exercises}
          partId={content.id}
        />
      ))}
      <p>Total of {totalExercises} exercises</p>
    </div>
  );
};
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

export default App;
