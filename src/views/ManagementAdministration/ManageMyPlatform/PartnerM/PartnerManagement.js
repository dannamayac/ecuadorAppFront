import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const PartnerManagement = () => {
    const [pageTitle] = useState('Gestión de socios');
    const navigate = useNavigate();

    // Función para manejar la acción de crear un usuario
    const handleCreatePartner = () => {
        // Redirige a la vista de edición de usuario
        navigate('/create-partner');
    };
    // Función para manejar la acción de editar un usuario
    const handleEditPartner = () => {
        // Redirige a la vista de edición de usuario
        navigate('/edit-partner');
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform"/>
                <button className="create-button" onClick={handleCreatePartner}>Crear nuevo usuario</button>
                {/* Tabla para listar usuarios */}
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Unidad</th>
                            <th>Correo</th>
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
                            <td>correo@ejemplo.com</td>
                            <td>Disponible</td>
                            <td>
                                <button onClick={handleEditPartner}>Editar</button>
                            </td>
                        </tr>
                        {/* Se pueden agregar más filas para más usuarios */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PartnerManagement;
