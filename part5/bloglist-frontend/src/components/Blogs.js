/* eslint-disable react/prop-types */
import Blog from './Blog';

function Blogs(props) {
  const { blogs } = props;

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
