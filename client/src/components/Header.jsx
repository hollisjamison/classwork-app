import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const Header = (props) => {
  const { authenticated, handleNotAuthenticated } = props;

  const handleLoginClick = () => {
    window.open("http://localhost:3001/auth/login", "_self");
  };

  const handleLogoutClick = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
    handleNotAuthenticated();
  };

  return (
    <ul className="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      {authenticated ? (
        <li>
          <Link onClick={handleLogoutClick}>Logout</Link>
        </li>
      ) : (
        <li>
          <Link onClick={handleLoginClick}>Login</Link>
        </li>
      )}
    </ul>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  authenticated: false,
};

export default Header;
