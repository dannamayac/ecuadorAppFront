import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const ExpenseHistory = () => {
    const [pageTitle] = useState('Historial de gastos');
    

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/expenses" startItem="General" />
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
                                <th>Caja</th>
                                <th>Trabajador</th>
                                <th>Tipo de gasto</th>
                                <th>Valor</th>
                                <th>Fecha</th>
                                <th>Comentario</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3923/Unidad/Daniel</td>
                                <td>Unidad</td>
                                <td>Daniel</td>
                                <td>Gasto</td>
                                <td>$100.000</td>
                                <td>20/04/2024</td>
                                <td>Comentario</td>
                                <td>Descripción</td>
                                <td>Acciones</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseHistory;
