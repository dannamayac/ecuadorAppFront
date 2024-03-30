import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const Sales = () => {
    const [pageTitle] = useState('Ventas');
    const [searchActive, setSearchActive] = useState(false);
    const [startDatePickerActive, setStartDatePickerActive] = useState(false);
    const [endDatePickerActive, setEndDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeSaleTable, setActiveSaleTable] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };

    const handleStartDatePickerToggle = () => {
        setStartDatePickerActive(!startDatePickerActive);
    };

    const handleEndDatePickerToggle = () => {
        setEndDatePickerActive(!endDatePickerActive);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setStartDatePickerActive(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setEndDatePickerActive(false);
    };

    const handleActiveSaleSelection = () => {
        setActiveSaleTable(true);
    };

    const handleInactiveSaleSelection = () => {
        setActiveSaleTable(false);
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
                        <div className="title-container">
                            <h1 className="header-title">Lista de ventas</h1>
                        </div>
                    </div>
                </div>
                <div className="income-form">
                    <div className="movement-type">
                        <div className="movementType-container">
                            <h2 className="sub-title">Tipo de movimiento</h2>
                        </div>
                        <div className="movement-options">
                            <input type="radio" id="activeSale" name="movementType" value="activeSale" onChange={handleActiveSaleSelection} />
                            <label htmlFor="activeSale">Venta Activa</label>
                            <input type="radio" id="inactiveSale" name="movementType" value="inactiveSale" onChange={handleInactiveSaleSelection} />
                            <label htmlFor="inactiveSale">Venta inactiva</label>
                        </div>
                    </div>
                    <div className='filters'>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
                        <div className="date-buttons">
                            <div className="date-inputs">
                                <div className="date-input">
                                    <p>Fecha de inicio</p>
                                    <button className="date-button" onClick={handleStartDatePickerToggle}>
                                        {startDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}` : 'Fecha de inicio'}
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                    </button>
                                    {startDatePickerActive && (
                                        <div className="calendar-wrapper">
                                            <Calendar
                                                onChange={handleStartDateChange}
                                                value={startDate}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="date-input">
                                    <p>Fecha fin</p>
                                    <button className="date-button" onClick={handleEndDatePickerToggle}>
                                        {endDate ? `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}` : 'Fecha fin'}
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                    </button>
                                    {endDatePickerActive && (
                                        <div className="calendar-wrapper">
                                            <Calendar
                                                onChange={handleEndDateChange}
                                                value={endDate}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {activeSaleTable ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Venta</th>
                                    <th>ID Preventa</th>
                                    <th>Unidad</th>
                                    <th>ID Cliente</th>
                                    <th>Fecha creación</th>
                                    <th>Valor</th>
                                    <th>Interés</th>
                                    <th>Saldo Total</th>
                                    <th>Tipo</th>
                                    <th>Tipo Venta</th>
                                    <th>Docum</th>
                                    <th>Días Mora</th>
                                    <th>Pagar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>002</td>
                                    <td>Unidad 1</td>
                                    <td>Cliente 1</td>
                                    <td>01/01/2024</td>
                                    <td>1000</td>
                                    <td>5%</td>
                                    <td>950</td>
                                    <td>Venta</td>
                                    <td>Online</td>
                                    <td>Docum 001</td>
                                    <td>0</td>
                                    <td>Sí</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Centro Negocios</th>
                                    <th>Número Unidad</th>
                                    <th>Número Venta</th>
                                    <th>ID Cliente Nombre</th>
                                    <th>Número Documento</th>
                                    <th>Total Venta</th>
                                    <th>Fecha de venta</th>
                                    <th>Fecha Inactivación</th>
                                    <th>Días Mora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Centro 1</td>
                                    <td>Unidad 2</td>
                                    <td>003</td>
                                    <td>Cliente 2</td>
                                    <td>Docum 002</td>
                                    <td>800</td>
                                    <td>05/01/2024</td>
                                    <td>10/01/2024</td>
                                    <td>5</td>
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sales;
