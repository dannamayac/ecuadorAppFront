import React, { useState, useEffect } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/OpeningOfBoxesStyles.css"

const OpeningOfBoxes = () => {
    const [pageTitle] = useState('Apertura masiva de cajas');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [startDatePickerActive, setStartDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [userSwitch, setUserSwitch] = useState(false);
    const [isActiveAll, setIsActiveAll] = useState(false);
    const [userStates, setUserStates] = useState([
        { id: 1, isActive: false },
        { id: 2, isActive: false }
    ]);
    const navigate = useNavigate();

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

    const handleOpeningOfBoxesHistoryClick = () => {
        navigate('/opening-of-boxes-history');
    }

    // Función para cambiar el estado de isActiveAll y de todos los switches de la tabla
    const toggleAllSwitches = () => {
        const newState = !isActiveAll;
        setIsActiveAll(newState);
        setUserStates(userStates.map(user => ({ ...user, isActive: newState })));
    };

    const handleStartDatePickerToggle = () => {
        setStartDatePickerActive(!startDatePickerActive);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setStartDatePickerActive(false);
    };

    const toggleUserSwitch = () => {
        setUserSwitch(!userSwitch);
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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General" />
                <div className="income-headerBoxes">
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
                    <div className="right-history">
                        <button className="history-button" onClick={handleOpeningOfBoxesHistoryClick}>Historico de aperturas masivas
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <div className="date-buttonsBoxes">
                        <div className="date-inputs">
                            <div className="date-input">
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

export default OpeningOfBoxes;
