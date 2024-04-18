import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFileExcel, faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/OpeningOfBoxesStyles.css"

const CleaningPayment = () => {
    const [pageTitle] = useState('Limpieza de cobro');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [searchActive, setSearchActive] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);
    const [activeButton, setActiveButton] = useState('Ventas activas');
    const [cleaningPayment, setCleaningPayment] = useState([]);


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
        const fetchCleaningPayment = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLECTION_CLEANING_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const cleaningPaymentData = data["Limpieza Cobro"];
                setCleaningPayment(cleaningPaymentData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchCleaningPayment();
    }, []); 

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
    };

    const toggleUserSwitch = () => {
        setUserSwitch(!userSwitch);
    };

    const handleActiveButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleExportToExcel = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLECTION_CLEANING_EXPORT_ENDPOINT}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'LimpiezaCobro.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al exportar a Excel: ', error);
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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General" />
                <div className="income-headerBoxes">
                    <div className="left-title">
                        <button className={`action-button ${activeButton === 'Ventas activas' ? 'selected' : ''}`} onClick={() => handleActiveButtonClick('Ventas activas')}>Ventas activas</button>
                        <button className={`action-button ${activeButton === 'Ventas inactivas' ? 'selected' : ''}`} onClick={() => handleActiveButtonClick('Ventas inactivas')}>Ventas inactivas</button>
                    </div>
                    <div className="right-history">
                    <button className="history-button" onClick={handleExportToExcel}>Exportar Excel
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
                        {Array.isArray(cleaningPayment) && cleaningPayment.map(cleaningPay => (
                            <tr>
                                <td>{cleaningPay.business_center}</td>
                                <td>{cleaningPay.id_unit_management}</td>
                                <td>{cleaningPay.sale_number}</td>
                                <td>{cleaningPay.name}</td>
                                <td>{cleaningPay.document_number}</td>
                                <td>{cleaningPay.total_sale}</td>
                                <td>{cleaningPay.pending_balance}</td>
                                <td>{cleaningPay.sale_date}</td>
                                <td>{cleaningPay.days_past_due}</td>
                                <td>{cleaningPay.payment_date}</td>
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
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default CleaningPayment;
