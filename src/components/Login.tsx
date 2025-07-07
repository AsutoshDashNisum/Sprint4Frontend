import React, { useState, useEffect } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, AppDispatch } from '../redux/store';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rememberedUser');
    if (saved) {
      setUsername(saved);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (username === 'divyak21' && password === 'divyak21') {
        dispatch(login({ username }));
        toast.success('Login successful!');
        if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        } else {
          localStorage.removeItem('rememberedUser');
        }
        navigate('/');
      } else {
        toast.error('Invalid username or password');
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info('Please contact the developer at disingh@nisum.com to reset your password.');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            className="login-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <button
            type="button"
            className="forgot-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
