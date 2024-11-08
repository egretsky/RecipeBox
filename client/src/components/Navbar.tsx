import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    auth.logout();  // Clear the user's auth token or session
    setLoginCheck(false);  // Update state to reflect the logged-out status
    navigate('/login');  // Redirect to the login page
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, []);

  return (
    <div className="navbar display-flex justify-space-between align-center py-2 px-5 mint-green">
      {
        // Conditional rendering based on loginCheck state
        !loginCheck ? (
          // View when not logged in
          <>
            <h1>Nourish Mate</h1>
            <button className="btn" type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </>

        ) : (
        
          <>
            <div className="navbar-left">
              {/* <img src="/path-to-logo-icon.svg" alt="Logo" className="logo-icon" /> {'/icon.png'} */}
              <span className="app-name">Nourish Mate</span>
            </div>
            <div className="navbar-right align-center">
              <Link to='/search' className="nav-link">Search Recipes</Link>
              <Link to='/profile' className="nav-link">My Profile</Link>
              <Link to='/add-recipe' className="nav-link">Add Recipe</Link>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default Navbar;

