// src/components/App.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import auth directly
import Login from './Auth/Login';
import Register from './Auth/Register';
import Meals from './Home/Meals';

const App = () => {
  const [user, setUser] = useState(null);
  const [redirectToMeals, setRedirectToMeals] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    setUser(auth.currentUser);
    setRedirectToMeals(true);
  };

  useEffect(() => {
    if (redirectToMeals) {
      navigate('/meals');
    }
  }, [redirectToMeals, navigate]);

  return (
    <div>
      {user ? (
        <Meals />
      ) : (
        <>
          <Login onAuth={handleAuth} />
          <Register onAuth={handleAuth} />
        </>
      )}
    </div>
  );
};

export default App;
