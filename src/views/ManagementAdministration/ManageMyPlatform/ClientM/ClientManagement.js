import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const ClientManagement = () => {
    const [pageTitle] = useState('Gestión de clientes');
    const navigate = useNavigate();
    const [userSwitch, setUserSwitch] = useState(false);
    const [customers,setCustomer] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CUSTOMERS_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const customersData = data["Gestion de Clientes"];
                setCustomer(customersData)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchCustomers();
    }, []);

    const handleCreateClient = () => {
        navigate('/create-client');
    };
    const handleEditClient = () => {
        navigate('/edit-client');
    };
    const toggleUserSwitch = () => {
        setUserSwitch(!userSwitch);
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Clientes" showButtons={true} />
                <button className="create-button" onClick={handleCreateClient}>Crear nuevo usuario</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Unidad</th>
                            <th>Numero doc</th>
                            <th>correo</th>
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
                            <td>{customer.state}</td>
                            <td>
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
                            <td>
                                <button onClick={handleEditClient}>Editar</button>
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
