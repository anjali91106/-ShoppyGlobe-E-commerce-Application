import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../Redux/authSlice';
import './CSS Files/Global.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    setTimeout(() => {
      if (isLogin) {
        if (formData.email === 'user@shoppyglobe.com' && formData.password === 'password') {
          const userData = {
            id: 1,
            name: 'ShoppyGlobe User',
            email: formData.email,
            avatar: 'https://picsum.photos/seed/user123/100/100.jpg'
          };
          dispatch(loginSuccess({
            user: userData,
            token: 'mock-jwt-token-' + Date.now()
          }));
          navigate(from, { replace: true });
        } else {
          dispatch(loginFailure('Invalid email or password. Try user@shoppyglobe.com / password'));
        }
      } else {
        if (formData.email && formData.password && formData.name) {
          const userData = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            avatar: `https://picsum.photos/seed/${formData.email}/100/100.jpg`
          };
          dispatch(loginSuccess({
            user: userData,
            token: 'mock-jwt-token-' + Date.now()
          }));
          navigate(from, { replace: true });
        } else {
          dispatch(loginFailure('Please fill all fields'));
        }
      }
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login to ShoppyGlobe' : 'Create Account'}</h2>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => dispatch({ type: 'auth/clearError' })} className="close-error">×</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={status === 'loading'} className="auth-button">
            {status === 'loading' ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="switch-button"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Email: user@shoppyglobe.com</p>
            <p>Password: password</p>
          </div>
        )}

        <div className="auth-back">
          <Link to="/" className="back-link">← Back to Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
