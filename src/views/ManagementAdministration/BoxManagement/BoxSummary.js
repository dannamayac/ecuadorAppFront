import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const BoxSummary = () => {
    const [pageTitle] = useState('Resumen de cajas');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [boxSummary, setBoxSummary] = useState([]);


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
        const fetchBoxSummary = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_BOX_MANAGEMENT_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const boxSummaryData = data["Gestion Cajas"];
                setBoxSummary(boxSummaryData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchBoxSummary();
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
                <Header title={pageTitle} backButtonPath="/box-management" startItem="General" />
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
                                <th>Unidad</th>
                                <th>Estado</th>
                                <th>Retiros</th>
                                <th>Gastos</th>
                                <th>Ingresos</th>
                                <th>Ventas</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(boxSummary) && boxSummary.map(boxSum => (
                            <tr>
                                <td>{boxSum.id_unit_management}</td>
                                <td>{boxSum.state}</td>
                                <td>{boxSum.withdrawals}</td>
                                <td>{boxSum.bills}</td>
                                <td>{boxSum.income}</td>
                                <td>{boxSum.sales}</td>
                                <td>{boxSum.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BoxSummary;
