import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome Back!');

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  const handleNewGame = () => {
    sessionStorage.setItem('Started Game', true);
    navigate('/world');
  };

  const handleContinue = () => {
    // navigate('/continue');
    navigate('/world');
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');
    let userInfo = JSON.parse(sessionStorage.getItem('User Info'));

    if (userInfo.displayName) {
      setWelcomeMessage(`Welcome Back, ${userInfo.displayName.split(' ')[0]}!`);
    }

    if (authToken) {
      navigate('/home');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h2 className="welcome-header">{welcomeMessage}</h2>
      <div className="home-container">
      <button onClick={handleNewGame} className="home-btn">New Game</button>
      <button onClick={handleContinue} className="home-btn">Continue</button>
      <button onClick={handleLogout} className="home-btn">Log out</button>
      </div>
    </div>
  );
};

export default Home;