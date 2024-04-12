import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import 'react-calendar/dist/Calendar.css'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const ExpensesApprovalsHistory = () => {
    const [pageTitle] = useState('Histórico de aprobación de gastos');
    const [searchActive, setSearchActive] = useState(false);


    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/approvals" startItem="General" />
                <div className="income-header">
                    <div className='filters filters-approvals'>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input2" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
                        <div className="income-form filter-form-inline">
                            <div className="filter-field filter-field-insurance">
                                <select id="filterByIdOrField" className="filter-select select-insurance">
                                    <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                    <option value="id">ID</option>
                                    <option value="field">Campo</option>
                                </select>
                            </div>
                            <div className="filter-field filter-field-insurance">
                                <select id="filterByUnit" className="filter-select select-insurance" >
                                    <option value="" disabled selected hidden>Todas las unidades:</option>
                                    {/* Opciones para filtrar por unidad */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>Unidad</th>
                                <th>ID pre-gasto</th>
                                <th>Descripción</th>
                                <th>Número documento</th>
                                <th>Fecha creación</th>
                                <th>Cantidad</th>
                                <th>Comentario</th>
                                <th>Aprobado</th>
                                <th>Estado</th>
                                <th>Fotos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3923/
                                    Unidad</td>
                                <td>6432</td>
                                <td>Descripción</td>
                                <td>10945569898</td>
                                <td>01/23/24</td>
                                <td>100</td>
                                <td>Comentario</td>
                                <td>Aprobado</td>
                                <td>1</td>
                                <td>Fotos</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpensesApprovalsHistory;