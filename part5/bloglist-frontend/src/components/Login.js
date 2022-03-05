/* eslint-disable react/prop-types */
function Login({ handleLogin, username, password, setUsername, setPassword }) {
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username ("admin")</label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password ("admin")</label>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            type="text"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
