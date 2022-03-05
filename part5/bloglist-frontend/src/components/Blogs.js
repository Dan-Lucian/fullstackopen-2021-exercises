/* eslint-disable react/prop-types */
import Blog from './Blog';

function Blogs({ blogs, setUser, nameUser }) {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>{nameUser} logged in</span>
        <button onClick={() => setUser(null)} type="button">
          logout
        </button>
      </div>

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
