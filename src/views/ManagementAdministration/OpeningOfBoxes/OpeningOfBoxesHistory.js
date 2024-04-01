import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const OpeningOfBoxesHistory = () => {
    const [pageTitle] = useState('Historico de apertura masiva de cajas');
    

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/income" startItem="General" />
                <div className="income-header">
                    <div className="left-title">
                        <div className="filter-fields">
                            <div className="filter-field">
                                <select id="filterByIdOrField" className="filter-select">
                                    <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                    <option value="id">ID</option>
                                    <option value="field">Campo</option>
                                </select>
                            </div>
                            <div className="filter-field">
                                <select id="filterByUnit" className="filter-select">
                                    <option value="" disabled selected hidden>Todas las unidades:</option>
                                    {/* Opciones para filtrar por unidad */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="income-form">
                    <table>
                        <thead>
                            <tr>
                                <th>Unidad</th>
                                <th>Usuario</th>
                                <th>Fecha ejecución</th>
                                <th>Estado ejecución</th>
                                <th>Evento ejecución</th>
                                <th>Mensaje salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Unidad</td>
                                <td>Daniel</td>
                                <td>20/01/2024</td>
                                <td>Activo</td>
                                <td>20/04/2024</td>
                                <td>Mensaje</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OpeningOfBoxesHistory;
