import React from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch({ type: 'auth/logout' });
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand" onClick={() => navigate('/')}>ASCEND</span>
        <ul className="nav-links">
          <li onClick={() => navigate('/projects')}>Project Management</li>
          <li onClick={() => navigate('/inventory')}>Inventory Management</li>
          <li onClick={() => navigate('/')}>Catalog Management</li>
        </ul>
      </div>
      <div className="navbar-right">
        {user?.username ? (
          <>
            <span className="user-text">Hello, {user.username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
