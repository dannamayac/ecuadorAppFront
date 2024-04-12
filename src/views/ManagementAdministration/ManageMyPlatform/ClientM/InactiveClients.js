import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const InactiveClients = () => {
    const [pageTitle] = useState('Historial de clientes inactivos');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [isActiveAll, setIsActiveAll] = useState(false);
    const [customers,setCustomer] = useState([]);

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
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CUSTOMER_INACTIVE_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const customersData = data["Clientes Inactivos"];
                setCustomer(customersData)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchCustomers();
    }, []);

    const toggleAllSwitches = () => {
        const newState = !isActiveAll;
        setIsActiveAll(newState);
        setCustomer(customers.map(user => ({ ...user, isActive: newState })));
    };

    const toggleUserSwitch = (userId) => {
        setCustomer(customers.map(user => {
            if (user.id === userId) {
                return { ...user, isActive: !user.isActive };
            }
            return user;
        }));
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
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Clientes" />
                <button className="create-button" >Activar todos &nbsp;&nbsp;
                    <label htmlFor="userActiveSwitch" className="switch2">
                        <input type="checkbox" id="userActiveSwitch" checked={isActiveAll} onChange={toggleAllSwitches} />
                        <span className="slider2 round2"></span>
                    </label>
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>ID Cliente Alias</th>
                            <th>Unidad Solicitante</th>
                            <th>Total Venta</th>
                            <th>Fecha Inactivación</th>
                            <th>Última fecha de pago</th>
                            <th>Contrato SI/NO</th>
                            <th>Usuario Inactivo</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(customers) && customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.id_unit_management}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{customer.name}</td>
                                <td></td>
                                <td>
                                    <label htmlFor={`userActiveSwitch-${customer.id}`} className="switch2">
                                        <input
                                            type="checkbox"
                                            id={`userActiveSwitch-${customer.id}`}
                                            checked={customer.isActive}
                                            onChange={() => toggleUserSwitch(customer.id)}
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
    );
};

export default InactiveClients;