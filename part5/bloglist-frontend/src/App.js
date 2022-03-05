import { useState, useEffect } from 'react';

// shared hooks
import { useLocalStorage } from './hooks/useLocalStorage';

// requesting functions
import blogService from './services/blogs';
import loginService from './services/login';

// shared components
import Blogs from './components/Blogs';
import Login from './components/Login';
import FormCreate from './components/FormCreate';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useLocalStorage('userLogged');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogReceived) => setBlogs(blogReceived));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userReceived = await loginService.login({ username, password });
      setUser(userReceived);
      blogService.setToken(userReceived.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  const handleCreateNote = async (event) => {
    event.preventDefault();
    try {
      const blogReturned = await blogService.create({ title, author, url });
      setBlogs((prev) => prev.concat(blogReturned));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  };

  if (!user)
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );

  return (
    <div>
      <Blogs blogs={blogs} setUser={setUser} nameUser={user.name} />
      <FormCreate
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        handleCreateNote={handleCreateNote}
      />
    </div>
  );
};

export default App;
