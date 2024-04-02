import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const KeyApprovals = () => {
    const [pageTitle] = useState('Aprobación de llaves');
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();

    const handleExpenseHistoryClick = () => {
        navigate('/income-history');
    }

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
                    <div className="left-title">
                        <div className="title-container">
                            <h1 className="header-title">Aprobación de llaves</h1>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button" onClick={handleExpenseHistoryClick}>Histórico de aprobación
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <div className='filters' style={{ marginLeft: '15px', marginTop: '30px' }}>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
                        <div className="filter-field" style={{ marginLeft:'-30px'}}>
                            <select id="filterByIdOrField" className="filter-select">
                                <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                <option value="id">ID</option>
                                <option value="field">Campo</option>
                            </select>
                        </div>
                        <div className="filter-field">
                            <select id="filterByUnit" className="filter-select" style={{ width:'200px'}}>
                                <option value="" disabled selected hidden>Todas las unidades:</option>
                                {/* Opciones para filtrar por unidad */}
                            </select>
                        </div>
                        <button className="createKey-button" onClick={handleExpenseHistoryClick}>Crear llave &nbsp;&nbsp;&nbsp;+</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Centro negocios</th>
                            <th>Número unidad</th>
                            <th>Número venta</th>
                            <th>Nombre</th>
                            <th>Número documento</th>
                            <th>Total venta</th>
                            <th>Saldo pendiente</th>
                            <th>Fecha venta</th>
                            <th>Días mora</th>
                            <th>Fecha pago</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Centro de negocio</td>
                            <td>123</td>
                            <td>456</td>
                            <td>Nombre</td>
                            <td>12345678</td>
                            <td>10.000.000</td>
                            <td>5.000.000</td>
                            <td>01/23/24</td>
                            <td>30</td>
                            <td>31/04/2024</td>
                            <td>
                                Acción
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default KeyApprovals;