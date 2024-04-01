import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const KeyCreationHistory = () => {
    const [pageTitle] = useState('Historial de creación de llaves');
    

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/key-creation" startItem="General" />
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
                                <th>Fecha solicitud</th>
                                <th>ID caja</th>
                                <th>Fecha caja</th>
                                <th>Unidad</th>
                                <th>Centro negocios</th>
                                <th>ID cliente</th>
                                <th>Tipo movimiento</th>
                                <th>Tipo venta</th>
                                <th>Cantidad Cuotas</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>20/04/2024l</td>
                                <td>12345</td>
                                <td>20/03/2024</td>
                                <td>Unidad</td>
                                <td>Centro de negocios</td>
                                <td>654789</td>
                                <td>Movimiento</td>
                                <td>Venta</td>
                                <td>12</td>
                                <td>$100.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default KeyCreationHistory;
