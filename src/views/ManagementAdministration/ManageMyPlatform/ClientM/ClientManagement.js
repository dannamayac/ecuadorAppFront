import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const ClientManagement = () => {
    const [pageTitle] = useState('Gestión de clientes');
    const navigate = useNavigate();

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

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/manage-platform"/>
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
                        {/* Se pueden agregar más filas para más usuarios */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientManagement;
