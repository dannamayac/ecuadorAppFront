import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"

const ManagePlatform = () => {
    const [pageTitle] = useState('Administrar mi plaforma');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();

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

    const handleUnitManagementClick = () => {
        navigate('/unit-management');
    }
    const handleUserManagementClick = () => {
        navigate('/user-management');
    }
    const handleClientManagementClick = () => {
        navigate('/client-management');
    }
    const handlePartnerManagementClick = () => {
        navigate('/partner-management');
    }
    const handleReportsAndMetricsClick = () => {
        navigate('/reports-metrics');
    }

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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="Administrar"/>
                <div className="top-pl">
                    <div className="button-row">
                        <button className="small-box" onClick={handleUnitManagementClick}>Gestión Unidades
                            <div className="sub-button">Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                        <button className="small-box" onClick={handleUserManagementClick}>Gestión Usuarios
                            <div className="sub-button">Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                        <button className="small-box" onClick={handleClientManagementClick}>Gestión Clientes
                            <div className="sub-button">Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                        <button className="small-box" onClick={handlePartnerManagementClick}>Gestión Socios
                            <div className="sub-button">Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="bottom-pl">
                    {/* Contenido de la parte inferior */}
                    <div className="bottom-buttons">
                        <button className="report-button" onClick={handleReportsAndMetricsClick}>
                            <div className="left-bu">Reportes y métricas</div>
                            <div className="right-bu">
                                <div className="sub-button">Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePlatform;
