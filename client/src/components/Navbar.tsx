import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar display-flex justify-space-between align-center py-2 px-5 mint-green">
      <div className="navbar-left">
        {/* <img src="/path-to-logo-icon.svg" alt="Logo" className="logo-icon" /> */}
        <span className="app-name">Nourish Mate</span>
      </div>
      <div className="navbar-right">
        <Link to='/top-recipes' className="nav-link">Search Recipes</Link>
        <Link to='/profile' className="nav-link">My Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;


