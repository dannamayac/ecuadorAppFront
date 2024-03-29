import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"


const ManagePlatform = () => {
    const [pageTitle] = useState('Administrar mi plaforma');
    const navigate = useNavigate();

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

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
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
                        <button className="report-button">
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
