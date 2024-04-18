import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faClock, faKey, faDollarSign, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/HeaderStyles.css';
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, backButtonPath, startItem }) => {
    library.add(far);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        // Función para verificar si se hizo clic fuera
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // Cierra el dropdown del usuario si está abierto
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotificationsDropdown(false); // Cierra el dropdown de notificaciones si está abierto
            }
        }

        // Agregar escuchador de eventos al montar
        document.addEventListener('mousedown', handleClickOutside);

        // Limpiar escuchador de eventos al desmontar
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleNotificationsDropdown = () => {
        setShowNotificationsDropdown(!showNotificationsDropdown);
    };
    // Notificaciones simuladas, reemplaza esto con tu estado o prop de notificaciones
    const notifications = [
        { id: 1, text: 'Notificación 1', icon: faClock, color: 'red' },
        { id: 2, text: 'Notificación 2', icon: faKey, color: 'yellow' },
        { id: 3, text: 'Notificación 3', icon: faDollarSign, color: 'green' },
    ];

    const removeNotification = (id) => {
        // Añade la lógica para eliminar la notificación
        console.log('Eliminar notificación', id);
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
                navigate('/'); // O a cualquier otra ruta según tu estructura de rutas
            } else {
                console.error('Error en el cierre de sesión');
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Ocurrió un error al intentar cerrar sesión');
        }
    };

    const handleNotificationsButtonClick = () => {
        navigate('/notifications');
    }

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
                <div className='notification-bell-icon' onClick={toggleNotificationsDropdown} ref={notificationRef}>
                    <FontAwesomeIcon icon={['far', 'bell']} style={{ color: 'rgb(118, 117, 117)'}} />
                    <span className="notification-badge"></span>
                    {showNotificationsDropdown && (
                        <div className='notification-dropdown'>
                             <div className="sub-buttonNotification" onClick={handleNotificationsButtonClick}>Ver todas &nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                             {notifications.slice(0, 3).map(notification => (
                                <div key={notification.id} className="notification-item">
                                    <span className={`notification-icon ${notification.color}`}>
                                        <FontAwesomeIcon icon={notification.icon} />
                                    </span>
                                    <span className="notification-text">{notification.text}</span>
                                    <FontAwesomeIcon icon={faTimes} className="notification-close" onClick={() => removeNotification(notification.id)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Foto de perfil del usuario */}
                <li className='user-photo'>
                    <img src={userProfileIcon} alt="Foto de perfil" />
                </li>
                {/* Información del usuario y dropdown */}
                <li className='user-info'>
                    <span className='name'>Nombre</span>
                    <span className='user'>@usuario</span>
                </li>
                <FontAwesomeIcon icon={faChevronDown} className='dropdown-icon' onClick={toggleDropdown} ref={dropdownRef}/>
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
