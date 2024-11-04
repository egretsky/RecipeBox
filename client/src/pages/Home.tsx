import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1 className="title">Nourish Mate</h1>
        <p className="description">
          From pantry to plate. Input ingredients, find recipes!
        </p>
        <button className="login-button" onClick={navigateToLogin}>Log-in</button>
        <p className="or-text">OR</p>
        <button className="create-account-button" onClick={navigateToSignup}>Create Account</button>
      </div>
    </div>
  );
}; 
export default Home;