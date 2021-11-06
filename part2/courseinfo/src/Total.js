const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

export default Total;
