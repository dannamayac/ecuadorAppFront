import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/HeaderStyles.css';
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, backButtonPath, startItem }) => {
    library.add(far);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        try {
            // Construir la URL de la API de cierre de sesión
            const logoutEndpoint = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGOUT_ENDPOINT}`;

            // Realizar la solicitud POST a la API de cierre de sesión
            const response = await fetch(logoutEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                // Eliminar el token de autenticación de local storage
                localStorage.removeItem('authToken');

                // Redirigir al usuario a la página de inicio de sesión o la página principal
                navigate('/login'); // O a cualquier otra ruta según tu estructura de rutas
            } else {
                console.error('Error en el cierre de sesión');
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Ocurrió un error al intentar cerrar sesión');
        }
    };

    const handleNotifications = () => {
        // Aquí maneja la lógica para desplegar las notificaciones
        console.log('Mostrar notificaciones');
    };

    return (
        <div className="header">
            <ul className='header-info'>
                <li className='return'><Link to={backButtonPath}><span>&lt; Volver</span></Link></li>
                {startItem && <li className='start'>{startItem}</li>}
                <div className="title-container">
                    <h1 className="header-title">{title}</h1>
                </div>
            </ul>
            <ul className='header-user'>
                {/* Botón de notificaciones */}
                <li className='notification-button' onClick={handleNotifications}>
                    <FontAwesomeIcon icon={['far', 'bell']} style={{ color: 'rgb(118, 117, 117)'}} />
                </li>
                {/* Foto de perfil del usuario */}
                <li className='user-photo'>
                    <img src={userProfileIcon} alt="Foto de perfil" />
                </li>
                {/* Información del usuario y dropdown */}
                <li className='user-info'>
                    <span className='name'>Nombre</span>
                    <span className='user'>@usuario</span>
                </li>
                <FontAwesomeIcon icon={faChevronDown} className='dropdown-icon' onClick={toggleDropdown} />
                {showDropdown && (
                    <div className='dropdown-menu'>
                        <ul>
                            <li onClick={handleLogout}>Cerrar sesión</li>
                            {/* Otros elementos del menú desplegable */}
                        </ul>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default Header;
