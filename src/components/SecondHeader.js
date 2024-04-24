import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faTimes, faClock, faKey, faDollarSign, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/SecondHeaderStyles.css'
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg'

const SecondHeader = ({ title, backButtonPath, startItem, showSearch, showButtons }) => {
    library.add(far);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        // Aquí maneja la lógica para cerrar sesión
        console.log('Cerrar sesión');
      };
      
    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };
    const handleInactiveClients = () => {
        navigate('/inactive-clients');
    };

    const handleRequests = () => {
        navigate('/portfolio-request');
    };
    const handleNotificationsButtonClick = () => {
        navigate('/notifications');
    }

  return (
    <div className="header">
        <ul className='header-info2'>
            <li className='return'><Link to={backButtonPath}><span>&lt; Volver</span></Link></li>
            {startItem && <li className='start'>{startItem}</li>}
            <div className="title-container">
                <h1 className="header-title">{title}</h1>
            </div>
        </ul>
        <div className='search'>
        {showSearch && (
            <div className={`search-container ${searchActive ? 'active' : ''}`}>
                <div className="search-wrapper">
                    <input className="search-input" type="text" placeholder="Escriba aquí para buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                </div>
            </div>
            )}
            <div className="buttons-container" style={{ display: showButtons ? 'flex' : 'none' }}>
                <button className="button inactive-clients" onClick={handleInactiveClients}>Clientes inactivos</button>
                <button className="button requests" onClick={handleRequests}>Solicitudes</button>
            </div>
        </div>
        <ul className='header-user2'>
            {/* Botón de notificaciones */}
            <div className='notification-bell-icon' onClick={toggleNotificationsDropdown}>
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

export default SecondHeader;
