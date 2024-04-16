import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../styles/SideBarStyles.css'

const SideBar = ({ isMenuVisible, setIsMenuVisible, setParentSidebarExpanded }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(window.innerWidth > 768);

  useEffect(() => {
    const sidebarElement = document.querySelector('.sidebar');
    // Desactiva las transiciones inmediatamente
    sidebarElement.style.transition = 'none';
  
    // Restablece las transiciones después de la renderización inicial
    requestAnimationFrame(() => {
      // Esto asegura que la reinicialización de las transiciones suceda después
      // de que el navegador haya tenido la oportunidad de pintar la página
      requestAnimationFrame(() => {
        sidebarElement.style.transition = '';
      });
    });
  
    // Asegúrate de limpiar este efecto si el componente se desmonta
    return () => {
      sidebarElement.style.transition = '';
    };
  }, []);

  useEffect(() => {
    // Esto asegura que el sidebar responda al cambio de isMenuVisible en pantallas pequeñas
    setSidebarExpanded(isMenuVisible);
  }, [isMenuVisible]);

  const closeSidebar = () => {
    setIsMenuVisible(false);
    if (window.innerWidth > 768) {
      setParentSidebarExpanded(false);
    }
  };

  const toggleSidebar = () => {
    const newExpandedState = !sidebarExpanded;
    setSidebarExpanded(newExpandedState);
    setParentSidebarExpanded(newExpandedState);
  };

  const sidebarClass = sidebarExpanded ? 'expanded' : 'contracted';

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={sidebarExpanded ? faChevronLeft : faChevronRight} />
      </button>
      {sidebarExpanded && (
          <button className="close-sidebar" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faTimes} />
          </button>
      )}
      <ul>
        <li>
          <NavLink to="/" exact className="sidebar-link">
            <span className="square"></span>
            <div className="text-container">Home</div>
            <span className="circle"></span>
            <div className="active-overlay"></div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/units-display" exact className="sidebar-link">
            <span className="square"></span>
            <div className="text-container">Visualizador de Unidades</div>
            <span className="circle"></span>
            <div className="active-overlay"></div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" exact className="sidebar-link">
            <span className="square"></span>
            <div className="text-container">Dashboard</div>
            <span className="circle"></span>
            <div className="active-overlay"></div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
