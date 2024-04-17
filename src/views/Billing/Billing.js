import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import "../../styles/ManagementAdministration/SalesStyles.css"

const Billing = () => {
    const [pageTitle] = useState('Facturación');
    const [activeSaleTable, setActiveSaleTable] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);
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
                <Header title={pageTitle} backButtonPath="/home" startItem="General" />
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
                            <h1 className="header-title">Rutina de facturación</h1>
                        </div>
                    </div>
                </div>
                <div className="income-form">
                    <div className="movement-type">
                        <div className="movementType-container">
                            <h2 className="sub-title">Consultar por</h2>
                        </div>
                        <div className="movement-options">
                            <input type="radio" id="activeSale" name="movementType" value="activeSale" onChange={handleActiveSaleSelection} />
                            <label htmlFor="activeSale">Pagos</label>
                            <input type="radio" id="inactiveSale" name="movementType" value="inactiveSale" onChange={handleInactiveSaleSelection} />
                            <label htmlFor="inactiveSale">No pagos</label>
                        </div>
                    </div>
                    {activeSaleTable ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Pagar</th>
                                    <th>Número factura</th>
                                    <th>Número recibo</th>
                                    <th>Fecha vencimiento</th>
                                    <th>Unidad</th>
                                    <th>Número ventas</th>
                                    <th>Número cajas</th>
                                    <th>Valor pagar</th>
                                    <th>¿Pagó?</th>
                                    <th>Fecha desde</th>
                                    <th>Fecha hasta</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$100.000</td>
                                    <td>002</td>
                                    <td>12345</td>
                                    <td>01/04/2024</td>
                                    <td>Unidad</td>
                                    <td>10</td>
                                    <td>1</td>
                                    <td>$100.000</td>
                                    <td>No</td>
                                    <td>01/01/2024</td>
                                    <td>01/05/2024</td>
                                    <td>Detalles</td>
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

export default Billing;