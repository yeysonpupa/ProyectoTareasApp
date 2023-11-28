import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario registrado:', user);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      setError('Error al registrar el usuario. Verifica tu correo y contraseña.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Registro</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSignUp}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/signin" className="signup-link">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
    </div>
  );
};

export default SignUp;
