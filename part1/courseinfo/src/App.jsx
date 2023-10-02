const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({
  part1,
  part2,
  part3,
  exercises1,
  exercises2,
  exercises3,
}) => {
  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </div>
  );
};
const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  );
};
const App = () => {
  const course = "Half Stack Application Development";

  return (
    <div>
      <Header course={course} />
      <Content
        exercises1={10}
        exercises2={7}
        exercises3={14}
        part1="Fundamentals of React"
        part2="Using props to pass data"
        part3="State of a component"
      />
      <Total exercises1={10} exercises2={7} exercises3={14} />
    </div>
  );
};

export default App;
