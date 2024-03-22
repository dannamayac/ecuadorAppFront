import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const UserManagement = () => {
    const [pageTitle] = useState('Gestión de usuarios');
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://192.168.0.9:8000/api/GestionUsuarios/listData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const usersData = data["Gestion de Unidades"];
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchUsers();
    }, []); 

    const handleCreateUser = () => {
        navigate('/create-user');
    };
    const handleEditUser = () => {
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
                        {Array.isArray(users) && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.user_name}</td>
                            <td>{user.rol_name}</td>
                            <td>{user.unit_name}</td>
                            <td>{user.email}</td>
                            <td>{user.celphone}</td>
                            <td>
                                <button onClick={handleEditUser}>Editar</button>
                            </td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
