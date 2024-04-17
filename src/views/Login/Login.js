import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyles.css';
import backgroundImage from '../../assets/9b058311-36ae-40f2-9606-1085e80168ea.webp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const loginEndpoint = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`;

            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);

                navigate('/');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Ocurrió un error al intentar iniciar sesión');
        }
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-container">
            <div className="left-p">
                <img src={backgroundImage} alt="Background" className="login-background" />
            </div>
            <div className="right-p">
                <h1 className="login-title">Ecuador App</h1>
                <p className="login-description">Confidence for your financial future</p>
                <h2 className="login-heading">Inicia sesión</h2>
                
                <label className="login-label">Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="Ingrese el correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onTouchStart={handleTouchStart}
                    className="login-input"
                />
                
                <label className="login-label">Contraseña:</label>
                <input
                    type="password"
                    placeholder="Ingrese la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onTouchStart={handleTouchStart}
                    className="login-input"
                />

                <button onClick={handleLogin} className="login-button">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default Login;
