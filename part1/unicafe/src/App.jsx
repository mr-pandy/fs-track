import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({
  good,
  bad,
  neutral,
  getTotal,
  getAverage,
  positiveFeedback,
}) => {
  const checkFeedback = good <= 0 && neutral <= 0 && bad <= 0;
  return (
    <div>
      <h1>Statistics</h1>
      {checkFeedback ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All: {getTotal}</p>
          <p>Average : {getAverage}</p>
          <p>Positive Feedback: {`${positiveFeedback.toFixed(2)}%`}</p>
        </div>
      )}
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const getTotal = good + bad + neutral;
  const getAverage = (good * 1 + neutral * 0 + bad * -1) / 3;
  const positiveFeedback = (good / getTotal) * 100;
  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give FeedBack</h1>
      <div>
        <Button text="good" handleClick={handleGoodClick} />
        <Button text="neutral" handleClick={handleNeutralClick} />
        <Button text="bad" handleClick={handleBadClick} />
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        getTotal={getTotal}
        getAverage={getAverage}
        positiveFeedback={positiveFeedback}
      />
    </div>
  );
};

export default App;
