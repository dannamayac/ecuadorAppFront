import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const UserManagement = () => {
    const [pageTitle] = useState('Gestión de usuarios');
    const navigate = useNavigate();

    // Función para manejar la acción de crear un usuario
    const handleCreateUser = () => {
        // Redirige a la vista de edición de usuario
        navigate('/create-user');
    };
    // Función para manejar la acción de editar un usuario
    const handleEditUser = () => {
        // Redirige a la vista de edición de usuario
        navigate('/edit-user');
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Usuarios" showSearch={true} />
                <button className="create-button" onClick={handleCreateUser}>Crear nuevo usuario</button>
                {/* Tabla para listar usuarios */}
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de usuario</th>
                            <th>Unidad</th>
                            <th>Correo</th>
                            <th>Número celular</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aquí se pueden mapear los datos de los usuarios */}
                        {/* Cada usuario debe tener una fila en la tabla */}
                        <tr>
                            <td>Nombre de Usuario</td>
                            <td>Tipo de Usuario</td>
                            <td>Unidad</td>
                            <td>correo@ejemplo.com</td>
                            <td>1234567890</td>
                            <td>
                                <button onClick={handleEditUser}>Editar</button>
                            </td>
                        </tr>
                        {/* Se pueden agregar más filas para más usuarios */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
