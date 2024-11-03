import { useState, FormEvent, ChangeEvent } from 'react';

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { signup } from "../api/authAPI";  // Import the login function from the API
import { UserSignup } from "../interfaces/UserSignup";  // Import the interface for UserSignUp

const Signup = () => {
  const [signupData, setSignupData] = useState<UserSignup>({ username: '', email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(signupData);
      Auth.login(data.token);  // Assume the signup returns a token like login
    } catch (err) {
      console.error('Failed to signup', err);
    }
  };

  return (
    <div className='form-container'>
      <form className='form signup-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={signupData.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signupData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
