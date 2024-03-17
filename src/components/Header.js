import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import '../styles/HeaderStyles.css'
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg'

const Header = () => {

    const handleNotifications = () => {
        // Aquí maneja la lógica para desplegar las notificaciones
        console.log('Mostrar notificaciones');
      };

  return (
    <div className="header">
      <ul className='header-info'>
        <li className='return'><a href="/volver">&lt; Volver</a></li>
        <li className='start'>Inicio</li>
        <li className='home'>Home</li>
      </ul>
      <ul className='header-user'>
        {/* Botón de notificaciones */}
        <li className='notification-button' onClick={handleNotifications}>
            <FontAwesomeIcon icon={faBell} style={{ backgroundColor: 'transparent' }} />
        </li>
        {/* Foto de perfil del usuario */}
        <li className='user-photo'>
          <img src={userProfileIcon} alt="Foto de perfil" />
        </li>
        {/* Información del usuario */}
        <li className='user-info'>
          <span className='name'>Nombre</span>
          <span className='user'>@usuario</span>
        </li>
      </ul>
    </div>
  );
};

export default Header
