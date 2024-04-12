import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserTie, faFileInvoice, faFileCirclePlus, faFileCircleCheck, faLocationDot, faGears } from '@fortawesome/free-solid-svg-icons'
import '../styles/HomeStyles.css'
import Sidebar from '../components/SideBar'
import Header from '../components/Header'

const Home = () =>{
    const [pageTitle] = useState('Home');
    const navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const sidebarRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.sidebar') && isMenuVisible) {
          setIsMenuVisible(false);
          if (window.innerWidth > 768) {
            setSidebarExpanded(false);
          }
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isMenuVisible]);

    const handleGestionButtonClick = () => {
        navigate('/management-administration');
    }
    const handleBillingButtonClick = () => {
        navigate('/billing');
    }
    const handleApprovalsButtonClick = () => {
        navigate('/approvals');
    }

    return (
        <div className="home-container">
            <FontAwesomeIcon 
                icon={faBars} 
                className="menu-icon" 
                onClick={() => setIsMenuVisible(!isMenuVisible)} // Manejador para el ícono
            />
            <Sidebar
                isMenuVisible={isMenuVisible}
                setIsMenuVisible={setIsMenuVisible}
                setParentSidebarExpanded={setSidebarExpanded}
            />
            <div className={`right-h ${sidebarExpanded ? '' : 'contracted'}`}>
                <Header title={pageTitle} startItem="Inicio"/>
                <div className="left-in">
                    <div className="button-container">
                        <button className="custom-button gestion" onClick={handleGestionButtonClick}>
                            <div className="left-bu">
                                <span className="button-text">Gestión y Administración</span>
                                <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                                <FontAwesomeIcon icon={faUserTie} />
                            </div>
                        </button>
                        <button className="custom-button facturacion" onClick={handleBillingButtonClick}>
                            <div className="left-bu">
                                Facturación
                                <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                                <FontAwesomeIcon icon={faFileInvoice} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="right-in">
                    <div className="button-container">
                        <button className="custom-button nueva-venta">
                            <div className="left-bu">
                                Nueva Venta (Nuevo préstamo)
                                <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                                <FontAwesomeIcon icon={faFileCirclePlus} />
                            </div>
                        </button>
                        <button className="custom-button aprobaciones" onClick={handleApprovalsButtonClick}>
                            <div className="left-bu">
                                Aprobaciones
                                <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                                <FontAwesomeIcon icon={faFileCircleCheck} />
                            </div>
                            </button>
                        <button className="custom-button mapa">
                        <div className="left-bu">
                            Mapa
                            <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                            <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            </button>
                        <button className="custom-button configuracion">
                        <div className="left-bu">
                            Configuración
                            <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                            <FontAwesomeIcon icon={faGears} />
                            </div>
                            </button>
                    </div>
                </div>
            </div>
        </div>
      );
    }

export default Home;