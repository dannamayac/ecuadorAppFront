import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import MapComponent from '../../components/MapComponent'
import "../../styles/Map/MapStyles.css"

// Datos de ejemplo para cada tipo de movimiento
const dataExample = {
    ventas: [{ lat: 4.60971, lng: -74.08175, info: 'ID Venta: #43532' }],
    recaudos: [{ lat: 4.70972, lng: -74.08173, info: 'Recaudo en Bogotá' }],
    // ... otros datos para ingresos y egresos, inicios y cierre de sesión
  }

const Map = () => {
    const [pageTitle] = useState('Mapa');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [startDatePickerActive, setStartDatePickerActive] = useState(false);
    const [endDatePickerActive, setEndDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('ventas');
    const calendarRef = useRef(null);

    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.sidebar') && isMenuVisible) {
                setIsMenuVisible(false);
                if (window.innerWidth > 768) {
                    setSidebarExpanded(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuVisible]);

    useEffect(() => {
        const handleClickOutsideCalendar = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setStartDatePickerActive(false);
                setEndDatePickerActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideCalendar);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideCalendar);
        };
    }, []);

    useEffect(() => {
        if (endDatePickerActive) {
            // Ajustar la posición del calendario de fecha fin si se desborda
            const calendar = calendarRef.current;
            if (calendar) {
                const rect = calendar.getBoundingClientRect();
                const isOverflowing = rect.right > window.innerWidth;
                if (isOverflowing) {
                    calendar.style.left = 'auto';
                    calendar.style.right = 0;
                }
            }
        }
    }, [endDatePickerActive]);

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


    return (
        <div className="home-container" id="map-view">
            <FontAwesomeIcon
                icon={faBars}
                className="menu-icon"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
            <Sidebar
                isMenuVisible={isMenuVisible}
                setIsMenuVisible={setIsMenuVisible}
                setParentSidebarExpanded={setSidebarExpanded}
            />
            <div className={`right-h ${sidebarExpanded ? '' : 'contracted'}`}>
                <Header title={pageTitle} backButtonPath="/" startItem="General" />
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
                    <div className="form-content">
                        <div className="movement-type">
                            <div className="movementType-container">
                                <h2 className="sub-title">Tipo de movimiento</h2>
                            </div>
                                <input
                                    type="radio"
                                    id="sells"
                                    name="movementType"
                                    value="sells"
                                    checked={selectedOption === 'ventas'}
                                    onChange={() => setSelectedOption('ventas')}
                                />
                                <label htmlFor="sells">Ventas</label>
                                <input
                                    type="radio"
                                    id="collections"
                                    name="movementType"
                                    value="collections"
                                    checked={selectedOption === 'recaudos'}
                                    onChange={() => setSelectedOption('recaudos')}
                                />
                                <label htmlFor="collections">Recaudos</label>
                                <input
                                    type="radio"
                                    id="incomeExpenses"
                                    name="movementType"
                                    value="incomeExpenses"
                                    checked={selectedOption === 'ingresosEgresos'}
                                    onChange={() => setSelectedOption('ingresosEgresos')}
                                />
                                <label htmlFor="incomeExpenses">Ingresos y egresos</label>
                                <input
                                    type="radio"
                                    id="logInOut"
                                    name="movementType"
                                    value="logInOut"
                                    checked={selectedOption === 'inicioCierre'}
                                    onChange={() => setSelectedOption('inicioCierre')}
                                />
                                <label htmlFor="LogInOut">Inicios y cierre de sesión</label>
                            </div>
                        </div>
                        <div className="date-buttons">
                            <div className="date-input">
                                <p>Fecha de inicio</p>
                                <button className="date-button" onClick={handleStartDatePickerToggle}>
                                    {startDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}` : 'Fecha de inicio'}
                                    <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                </button>
                                {startDatePickerActive && (
                                    <div className="calendar-wrapper" ref={calendarRef}>
                                        <Calendar onChange={handleStartDateChange} value={startDate} />
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
                                    <div className="calendar-wrapper" ref={calendarRef}>
                                        <Calendar onChange={handleEndDateChange} value={endDate} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <MapComponent data={dataExample[selectedOption]} />
                </div>
            </div>
    );
};

export default Map;
