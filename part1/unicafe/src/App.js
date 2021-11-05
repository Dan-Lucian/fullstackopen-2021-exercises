import React, { useState } from 'react';
import Title from './Title';
import Button from './Button';
import Statistics from './DisplayStatistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={incrementGood} />
      <Button text="neutral" onClick={incrementNeutral} />
      <Button text="bad" onClick={incrementBad} />
      <Title text="statistics" />
      <Statistics reviews={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
