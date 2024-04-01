import React from 'react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/OpeningOfBoxesStyles.css"

const CleaningPayment = () => {
    const [pageTitle] = useState('Limpieza de cobro');
    const [isOpen, setIsOpen] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);
    const [isActiveAll, setIsActiveAll] = useState(false);
    const [userStates, setUserStates] = useState([
        { id: 1, isActive: false },
        { id: 2, isActive: false }
    ]);

    // Función para cambiar el estado de isActiveAll y de todos los switches de la tabla
    const toggleAllSwitches = () => {
        const newState = !isActiveAll;
        setIsActiveAll(newState);
        setUserStates(userStates.map(user => ({ ...user, isActive: newState })));
    };

    const handleOpenButtonClick = () => {
        setIsOpen(true);
    };

    const handleCloseButtonClick = () => {
        setIsOpen(false);
    };

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };

    const toggleUserSwitch = () => {
        setUserSwitch(!userSwitch);
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
                        <button className={`action-button ${isOpen ? 'selected' : ''}`} onClick={handleOpenButtonClick}>Ventas activas</button>
                        <button className={`action-button ${!isOpen ? 'selected' : ''}`} onClick={handleCloseButtonClick}>Ventas inactivas</button>
                    </div>
                    <div className="right-history">
                        <button className="history-button">Exportar Excel
                            <FontAwesomeIcon icon={faFileExcel} className="excel-icon"/>
                            <div className="sub-button" style={{ width: '75px', marginBottom:'5px' }}>Exportar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                <div className='filters'>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Escriba aquí para buscar" />
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
                            <div className="filter-field">
                                <select id="filterByUnit" className="filter-select">
                                    <option value="" disabled selected hidden>Días de mora:</option>
                                    {/* Opciones para filtrar por unidad */}
                                </select>
                            </div>
                        </div>
                    <table>
                    <thead>
                        <tr>
                            <th>/1/ - CN de la sociedad 234235</th>
                            <th>
                            <label htmlFor="userActiveSwitch" className="switch2">
                                <input type="checkbox" id="userActiveSwitch" checked={isActiveAll} onChange={toggleAllSwitches} />
                                <span className="slider2 round2"></span>
                            </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                    <td>12 - Unidad - Nombre - Socio %</td>
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
