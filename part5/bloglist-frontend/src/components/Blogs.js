/* eslint-disable react/prop-types */
import Blog from './Blog';

function Blogs({ blogs, setUser }) {
  return (
    <div>
      <h2>blogs</h2>
      <button onClick={() => setUser(null)} type="button">
        logout
      </button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
