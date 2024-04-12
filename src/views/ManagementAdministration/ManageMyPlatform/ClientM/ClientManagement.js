import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const ClientManagement = () => {
    const [pageTitle] = useState('Gestión de clientes');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [customers, setCustomers] = useState([]);
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

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CUSTOMERS_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const customersData = data["Gestion de Clientes"];
                setCustomers(customersData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleCreateClient = () => {
        navigate('/create-client');
    };

    const handleEditClient = (customerId) => {
        navigate(`/edit-client/${customerId}`);
    };

    const toggleUserSwitch = (customerId) => {
        setCustomers(prevCustomers =>
            prevCustomers.map(customer =>
                customer.id === customerId ? { ...customer, state: customer.state === 1 ? 0 : 1 } : customer
            )
        );
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
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Clientes" showButtons={true} />
                <button className="create-button" onClick={handleCreateClient}>
                    <div className="left-bu">Crear nuevo cliente </div>
                    <div className="right-bu">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Unidad</th>
                            <th>Numero doc</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(customers) && customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.document_number}</td>
                            <td>{customer.id_unit_management}</td>
                            <td>{customer.email}</td>
                            <td>
                                <label htmlFor={`userActiveSwitch_${customer.id}`} className="switch2">
                                    <input
                                        type="checkbox"
                                        id={`userActiveSwitch_${customer.id}`}
                                        checked={customer.state === 1}
                                        onChange={() => toggleUserSwitch(customer.id)}
                                    />
                                    <span className="slider2 round2"></span>
                                </label>
                            </td>
                            <td>
                                <button className='edit-button' onClick={() =>handleEditClient(customer.id)}>Editar</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientManagement;
