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
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useLocalStorage('userLogged');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [messageNotification, setMessageNotification] = useState(null);

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
      setMessageNotification(`wrong username or password`);
      setTimeout(() => {
        setMessageNotification(null);
      }, 5000);
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
      setMessageNotification(
        `a new blog ${blogReturned.title} by ${blogReturned.author} added`
      );
      setTimeout(() => {
        setMessageNotification(null);
      }, 5000);
    } catch (error) {
      setMessageNotification(`${error.name}: ${error.message}`);
      setTimeout(() => {
        setMessageNotification(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={messageNotification} />

      {!user ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
