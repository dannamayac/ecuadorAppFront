import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import "../../styles/Notifications/NotificationsStyles.css"

const Notifications = () => {
    const [pageTitle] = useState('Notificaciones');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [user, setUser] = useState({ id: 1, isActive: false });
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    library.add(far);
    const [notifications, setNotifications] = useState([
        // Simulación de algunas notificaciones
        { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', icon: 'alarm', color: 'red' },
        { id: 2, text: 'HOLA ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud', icon: 'alarm', color: 'red' },
    ]);

    const toggleUserSwitch = (userId, action) => {
        if (action === 'check') {
            setUser(prevUser => ({ ...prevUser, isActive: true }));
        } else if (action === 'times') {
            setUser(prevUser => ({ ...prevUser, isActive: false }));
        }
    };

    return (
        <div className="home-container">
            <FontAwesomeIcon
                icon={faBars}
                className="menu-icon"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
            <Sidebar
                isMenuVisible={isMenuVisible}
                setIsMenuVisible={setIsMenuVisible}
                setParentSidebarExpanded={setSidebarExpanded}
            />
            <div className={`right-h ${sidebarExpanded ? '' : 'contracted'}`}>
                <Header title={pageTitle} backButtonPath="/home" startItem="General" />
                <div className="notifications-list">
                    {notifications.map(notification => (
                        <div key={notification.id} className="notification-card">
                            <div className='notification-bell-icon'>
                                <FontAwesomeIcon icon={['far', 'bell']} />
                                {/* Badge para notificaciones, asegúrate de incluir condicionales si es necesario */}
                                <span className="notification-badge"></span>
                            </div>
                            <div className="notification-content">
                                <p>{notification.text}</p>
                            </div>
                            <div className='check-container'>
                                <button
                                    className={`checkbox-button ${user.isActive ? 'active-check' : ''}`}
                                    onClick={() => toggleUserSwitch(user.id, 'check')}
                                >
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                </button>
                                <button
                                    className={`checkbox-button ${!user.isActive ? 'active-times' : ''}`}
                                    onClick={() => toggleUserSwitch(user.id, 'times')}
                                >
                                    <FontAwesomeIcon icon={faTimes} className="times-icon" />
                                </button>
                                <div className='next-container'>
                                    <FontAwesomeIcon icon={faChevronRight} className="notification-next" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
