import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/SecondHeaderStyles.css'
import userProfileIcon from '../assets/user-profile-icon-free-vector.jpg'

const SecondHeader = ({ title, backButtonPath, startItem, showSearch, showButtons }) => {
    library.add(far);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();

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
    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };
    const handleInactiveClients = () => {
        navigate('/inactive-clients');
    };

    const handleRequests = () => {
        navigate('/portfolio-request');
    };

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
