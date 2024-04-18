import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const KeyCreationHistory = () => {
    const [pageTitle] = useState('Historial de creación de llaves');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [keyCreation, setKeyCreation] = useState([]);

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
        const fetchKeyCreation = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_KEY_CREATION_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const keyCreationData = data["Creacion Llaves"];
                setKeyCreation(keyCreationData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchKeyCreation();
    }, []); 

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
                <Header title={pageTitle} backButtonPath="/key-creation" startItem="General" />
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
                    <table>
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
                                <th>Cantidad Cuotas</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(keyCreation) && keyCreation.map(keyCreat => (
                            <tr>
                                <td>{keyCreat.application_date}</td>
                                <td>{keyCreat.id_cash_management}</td>
                                <td>{keyCreat.id_cash_management}</td>
                                <td>{keyCreat.id_unit_management}</td>
                                <td>{keyCreat.business_center}</td>
                                <td>{keyCreat.id_customer_management}</td>
                                <td>{keyCreat.movement_type}</td>
                                <td>{keyCreat.sale_type}</td>
                                <td>{keyCreat.quantity_Fees}</td>
                                <td>{keyCreat.value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default KeyCreationHistory;
