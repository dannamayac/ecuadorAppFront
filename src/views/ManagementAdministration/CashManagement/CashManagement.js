import React from 'react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/OpeningOfBoxesStyles.css"

const CashManagement = () => {
    const [pageTitle] = useState('Gestión de cajas');
    const [startDatePickerActive, setStartDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleStartDatePickerToggle = () => {
        setStartDatePickerActive(!startDatePickerActive);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setStartDatePickerActive(false);
    };

    const handleOpenButtonClick = () => {
        setIsOpen(true);
    };

    const handleCloseButtonClick = () => {
        setIsOpen(false);
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
                        <button className={`action-button ${isOpen ? 'selected' : ''}`} onClick={handleOpenButtonClick}>Abrir caja</button>
                        <button className={`action-button ${!isOpen ? 'selected' : ''}`} onClick={handleCloseButtonClick}>Cerrar caja</button>
                    </div>
                    <div className="right-history">
                        <button className="history-button">Resumen
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <div className="date-buttonsBoxes">
                        <div className="date-inputs">
                            <div className={`date-input ${isOpen ? '' : 'hidden'}`}>
                                <p>Fecha de apertura de CNS & UGIS</p>
                                <button className="date-button" onClick={handleStartDatePickerToggle}>
                                    {startDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}` : 'Fecha'}
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
                            <div className={`income-field custom-field ${isOpen ? '' : 'closed'}`}>
                                <label htmlFor="unit">Unidad</label>
                                <select id="unit">
                                    <option value="" disabled selected hidden>Seleccionar unidad</option>
                                    {/* opciones de UGI Diaria */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="income-buttonsK">
                        <button className="create-button create">{isOpen ? 'Abrir caja' : 'Cerrar caja'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CashManagement;
