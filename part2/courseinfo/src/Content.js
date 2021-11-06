import Part from './Part';
import Total from './Total';

const Content = ({ course }) => {
  return (
    <section>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total course={course} />
    </section>
  );
};

export default Content;
