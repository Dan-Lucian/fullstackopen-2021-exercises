import { useState, useEffect } from 'react';

// requesting functions
import blogService from './services/blogs';
import loginService from './services/login';

// shared components
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogReceived) => setBlogs(blogReceived));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userReceived = await loginService.login({ username, password });
      setUser(userReceived);
      loginService.setToken(userReceived.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  return (
    <div>
      {user !== null && <Blogs blogs={blogs} />}
      {user === null && (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
