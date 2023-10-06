import { useState } from "react";

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <p key={part.name}>
          {part.name} : {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );

  return <p>Number of exercises: {totalExercises}</p>;
};
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ resetToZero, increaseByOne, decreaseByOne }) => {
  return (
    <div>
      <button onClick={decreaseByOne}>-</button>
      <button onClick={resetToZero}>reset(0)</button>
      <button onClick={increaseByOne}>+</button>
    </div>
  );
};
const PrevTest = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const [counter, setCounter] = useState(0);

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    };
    setClicks(newClicks);
  };
  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };
  const increaseByOne = () => {
    setCounter(counter + 1);
  };
  const decreaseByOne = () => {
    setCounter(counter - 1);
  };
  const setToZero = () => {
    setCounter(0);
  };
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  console.log("rendering...", counter);

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />

      <Display counter={counter} />
      <Button
        increaseByOne={increaseByOne}
        decreaseByOne={decreaseByOne}
        resetToZero={setToZero}
      />

      <div>
        {clicks.left}
        <button onClick={() => setClicks(handleLeftClick)}>left</button>
        <button onClick={() => setClicks(handleRightClick)}>right</button>
        {clicks.right}
      </div>
    </div>
  );
};

export default PrevTest;
