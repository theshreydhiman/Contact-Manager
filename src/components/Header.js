import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>Contact Manager</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Header;
