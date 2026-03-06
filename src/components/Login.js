import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to login
    console.log('Login successful');
    history.push('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default Login;
