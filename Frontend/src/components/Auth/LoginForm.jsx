import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
    const {user , login , error , setError} = useContext(AuthContext)
  const [username, setUsername] = useState('anish');
  const [password, setPassword] = useState('anish123');
  const [errors, setErrors] = useState({});
  

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'username is required';
    } 
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handling form submit");
    if (validateForm()) {
      const MockToken = "asdfghj123"
        login(username, password, MockToken);

      // console.log('Form submitted successfully:', { username, password });
      navigate('/dashboard' , {replace: true})
      // You can handle the form submission (API request, etc.)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full animate-slideIn">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        <p className="text-red-500 text-xs mt-1">{error}</p>
          {/* Forgot Password */}
          <div className="text-center mt-4 text-sm">
            <a href="#" className="text-blue-400 hover:text-blue-500 transition duration-200">
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Sign Up Prompt */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
