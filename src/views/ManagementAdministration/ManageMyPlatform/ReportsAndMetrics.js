import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"


const ReportsAndMetrics = () => {
    const [pageTitle] = useState('Reportes y métricas');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
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
                    <button className="history-button" style={{ marginLeft: '33px', marginTop:'20px' }} >Generar reporte</button>
                </div>
            </div>
        </div>
    );
};

export default ReportsAndMetrics;
