import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuario autenticado:', user);
            navigate('/');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            setError('Error al iniciar sesión. Verifica tu correo y contraseña.');
        }
    };

    return (
        <div className="signin-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="signin-form" onSubmit={handleSignIn}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <Link to="/signup" className="signin-link">¿No tienes cuenta? Regístrate aquí</Link>
        </div>
    );
};

export default SignIn;
