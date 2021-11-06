import StatisticsLine from './StatisticsLine';

const Statistics = ({ reviews }) => {
  const { good, neutral, bad } = reviews;

  const reviewsCount = good + neutral + bad;
  const reviewsAvg = (good - bad) / reviewsCount;
  const reviewsPosRatio = (good / reviewsCount) * 100 + ' %';

  if (reviewsCount === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={reviewsCount} />
        <StatisticsLine text="average" value={reviewsAvg} />
        <StatisticsLine text="positive" value={reviewsPosRatio} />
      </tbody>
    </table>
  );
};

export default Statistics;
