import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const ClientManagement = () => {
    const [pageTitle] = useState('Gestión de clientes');
    const navigate = useNavigate();
    const [userSwitch, setUserSwitch] = useState(false);

    // Función para manejar la acción de crear un usuario
    const handleCreateClient = () => {
        // Redirige a la vista de edición de usuario
        navigate('/create-client');
    };
    // Función para manejar la acción de editar un usuario
    const handleEditClient = () => {
        // Redirige a la vista de edición de usuario
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
                <button className="create-button" onClick={handleCreateClient}>Crear nuevo usuario &nbsp;</button>
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
                            <td>
                                <button onClick={handleEditClient}>Editar</button>
                            </td>
                        </tr>
                        {/* Se pueden agregar más filas para más usuarios */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientManagement;
