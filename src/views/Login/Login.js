import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/LoginStyles.css'
import backgroundImage from '../../assets/9b058311-36ae-40f2-9606-1085e80168ea.webp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-container">
            <div className='left-p'>
                <img src={backgroundImage} alt="Background" className="login-background" />
            </div>
            <div className='right-p'>
                {/* <img src="src\assets\user-profile-icon-free-vector.jpg" alt="Bank Icon" className="login-icon" /> */}
                <h1 className="login-title">Ecuador App</h1>
                <p className="login-description">Confidence for your financial future</p>
                <h2 className="login-heading">Inicia sesión</h2>
                <label className="login-label">Correo electrónico</label>
                <input
                    placeholder="Ingrese el correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onTouchStart={handleTouchStart}
                    className="login-input"
                />
                <label className="login-label">Contraseña:</label>
                <input
                    placeholder="Ingrese la contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onTouchStart={handleTouchStart}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">Iniciar sesión</button>
            </div>
        </div>
    );
};


export default Login;
