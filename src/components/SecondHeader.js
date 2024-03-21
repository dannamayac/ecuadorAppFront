import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/HeaderStyles.css'
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg'

const SecondHeader = ({ title, backButtonPath }) => {
    library.add(far);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        // Aquí maneja la lógica para cerrar sesión
        console.log('Cerrar sesión');
      };

    const handleNotifications = () => {
        // Aquí maneja la lógica para desplegar las notificaciones
        console.log('Mostrar notificaciones');
    };

  return (
    <div className="header">
        <ul className='header-info'>
            <li className='return'><Link to={backButtonPath}><span>&lt; Volver</span></Link></li>
            <div className="title-container">
                <li className="header-title">{title}</li>
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

export default SecondHeader;
