import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const ClientManagement = () => {
    const [pageTitle] = useState('Gestión de clientes');
    const navigate = useNavigate();
    const [userSwitch, setUserSwitch] = useState(false);
    const [clients,setClient] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://192.168.0.9:8000/api/GestionClientes/listData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const clientsData = data["Gestion de Unidades"];
                setClient(clientsData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchClients();
    }, []); 

    const handleCreateClient = () => {
        navigate('/create-client');
    };
    const handleEditClient = () => {
        navigate('/edit-client');
    };
    // Función para cambiar el estado del switch de la tabla
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
                {/* Tabla para listar usuarios */}
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
                        {/* Aquí se pueden mapear los datos de los usuarios */}
                        {/* Cada usuario debe tener una fila en la tabla */}
                        <tr>
                            <td>Nombre de socio</td>
                            <td>Unidad</td>
                            <td>1094562321</td>
                            <td>correo@ejemplo.com</td>
                            <td>Disponible</td>
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
