import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

// Fonction asynchrone qui gère la soumission du formulaire de connexion
const handleSubmit = async (e) => {
  // Empêche le rechargement automatique de la page lors de la soumission du formulaire
  e.preventDefault();

  try {
      // Dispatch l'action de connexion avec les identifiants
      // await attend que la promesse soit résolue avant de continuer
      // unwrap() permet de gérer directement la promesse retournée par l'action Redux
      await dispatch(login({ email, password })).unwrap();
      
      // Si la connexion réussit, redirige l'utilisateur vers la page de profil
      navigate('/profile');
  } catch (err) {
      // En cas d'échec de la connexion, affiche l'erreur dans la console
      console.error('Failed to log in:', err);
  }
};

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default Login;