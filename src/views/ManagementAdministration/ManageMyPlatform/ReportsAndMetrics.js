import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"


const ReportsAndMetrics = () => {
    const [pageTitle] = useState('Reportes y métricas');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

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
                <Header title={pageTitle} backButtonPath="/manage-platform" startItem="Administrar"/>
                <div className="income-form">
                    <div className="income-fields">
                        <div className="income-field">
                            <label htmlFor="unit">Unidad</label>
                            <select id="unit">
                                <option value="" disabled selected hidden>Seleccione la unidad</option>
                                {/* opciones de unidad */}
                            </select>
                        </div>
                        <div className="income-field">
                            <label htmlFor="ReportType">Tipo de reporte</label>
                            <select id="ReportType">
                                <option value="" disabled selected hidden>Seleccione tipo de reporte</option>
                                {/* opciones de tipo de reporte */}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="create-button2 create" style={{marginTop:'20px', marginLeft:'33px'}}>Generar reporte</button>
                </div>
            </div>
        </div>
    );
};

export default ReportsAndMetrics;
