import React from 'react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/OpeningOfBoxesStyles.css"

const CleaningPayment = () => {
    const [pageTitle] = useState('Limpieza de cobro');
    const [searchActive, setSearchActive] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);
    const [activeButton, setActiveButton] = useState('Ventas activas');

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };

    const toggleUserSwitch = () => {
        setUserSwitch(!userSwitch);
    };

    const handleActiveButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General" />
                <div className="income-headerBoxes">
                    <div className="left-title">
                        <button className={`action-button ${activeButton === 'Ventas activas' ? 'selected' : ''}`} onClick={() => handleActiveButtonClick('Ventas activas')}>Ventas activas</button>
                        <button className={`action-button ${activeButton === 'Ventas inactivas' ? 'selected' : ''}`} onClick={() => handleActiveButtonClick('Ventas inactivas')}>Ventas inactivas</button>
                    </div>
                    <div className="right-history">
                        <button className="history-button">Exportar Excel
                            <FontAwesomeIcon icon={faFileExcel} className="excel-icon"/>
                            <div className="sub-button" style={{ width: '75px' }}>Exportar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <div className='filters'>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input2" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
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
                        {activeButton === 'Ventas activas' && (
                            <div className="filter-field">
                                <select id="filterByUnit" className="filter-select">
                                    <option value="" disabled selected hidden>Días de mora:</option>
                                    <option value="id">8</option>
                                    <option value="field">20</option>
                                </select>
                            </div>
                        )}
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
                                    {/* Switch de la tabla */}
                                    <label htmlFor="userActiveSwitch" className="switch2">
                                        <input
                                            type="checkbox"
                                            id="userActiveSwitch"
                                            checked={userSwitch}
                                            onChange={toggleUserSwitch}
                                        />
                                        <span className="slider2 round2"></span>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default CleaningPayment;
