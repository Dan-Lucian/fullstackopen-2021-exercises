import Content from './Content';
import CourseHeader from './CourseHeader';

const Course = ({ courses }) => {
  return courses.map((course) => (
    <article key={course.id}>
      <CourseHeader course={course} />
      <Content course={course} />
    </article>
  ));
};

export default Course;
