import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideBarStyles.css';

const SideBar = () => {
  return (
    <div className="sidebar">
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
