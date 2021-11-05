import Display from './Display';

const Statistics = ({ reviews }) => {
  const { good, neutral, bad } = reviews;

  const reviewsCount = good + neutral + bad;
  const reviewsAvg = reviewsCount ? (good - bad) / reviewsCount : 'no reviews';
  const reviewsPosRatio = reviewsCount
    ? (good / reviewsCount) * 100 + ' %'
    : 'no reviews';

  return (
    <>
      <Display text={`good ${good}`} />
      <Display text={`neutral ${neutral}`} />
      <Display text={`bad ${bad}`} />
      <Display text={`all ${reviewsCount}`} />
      <Display text={`average ${reviewsAvg}`} />
      <Display text={`positive ${reviewsPosRatio}`} />
    </>
  );
};

export default Statistics;
