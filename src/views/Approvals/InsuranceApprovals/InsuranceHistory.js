import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faCheck, faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const InsuranceHistory = () => {
    const [pageTitle] = useState('Aprobaciones');
    const [startDatePickerActive, setStartDatePickerActive] = useState(false);
    const [endDatePickerActive, setEndDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [user, setUser] = useState({ id: 1, isActive: false });
    const calendarRef = useRef(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

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

    const toggleUserSwitch = (userId, action) => {
        if (action === 'check') {
            setUser(prevUser => ({ ...prevUser, isActive: true }));
        } else if (action === 'times') {
            setUser(prevUser => ({ ...prevUser, isActive: false }));
        }
    };

    return (
        <div className="home-container">
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
                <Header title={pageTitle} backButtonPath="/insurance-approvals" startItem="General" />
                <div className="income-header">
                    <div className="left-title">
                        <div className="title-container">
                            <h1 className="header-title">Historico de aprobación de seguros</h1>
                        </div>
                    </div>
                </div>
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
                <div className='filters'>
                <div className="date-buttons" style={{marginLeft:'33px'}}>
                    <div className="date-inputs">
                        <div className="date-input">
                            <p>Fecha de inicio</p>
                            <button className="date-button" onClick={handleStartDatePickerToggle}>
                                {startDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}` : 'Fecha de inicio'}
                                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                            </button>
                            {startDatePickerActive && (
                                <div className="calendar-wrapper" ref={calendarRef}>
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
                                <div className="calendar-wrapper" ref={calendarRef}>
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
                <div className="table-container">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID Unidad</th>
                                <th>ID Trabajador</th>
                                <th>Paquete</th>
                                <th>Costo</th>
                                <th>Fecha solicitud</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3923/
                                    Unidad</td>
                                <td>6432</td>
                                <td>R25B5FBK</td>
                                <td>500.000</td>
                                <td>01/23/24</td>
                                <td>
                                    <button
                                        className={`checkbox-button ${user.isActive ? 'active-check' : ''}`}
                                        onClick={() => toggleUserSwitch(user.id, 'check')}
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                    </button>
                                    <button
                                        className={`checkbox-button ${!user.isActive ? 'active-times' : ''}`}
                                        onClick={() => toggleUserSwitch(user.id, 'times')}
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="times-icon" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InsuranceHistory;