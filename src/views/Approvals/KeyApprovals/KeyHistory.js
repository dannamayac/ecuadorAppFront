import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import 'react-calendar/dist/Calendar.css'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const KeyHistory = () => {
    const [pageTitle] = useState('Histórico de aprobaciones');
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
                                <th>Fecha solicitud</th>
                                <th>ID caja</th>
                                <th>Fecha caja</th>
                                <th>Unidad</th>
                                <th>Centro negocios</th>
                                <th>ID cliente</th>
                                <th>Tipo movimiento</th>
                                <th>Tipo venta</th>
                                <th>Cantidad cuotas</th>
                                <th>Ventas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01/23/24</td>
                                <td>6432</td>
                                <td>01/23/24</td>
                                <td>3923/
                                    Unidad</td>
                                <td>Exito</td>
                                <td>123456</td>
                                <td>Prestamo</td>
                                <td>Presencial</td>
                                <td>10</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default KeyHistory;