import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const UserManagement = () => {
    const [pageTitle] = useState('Gestión de usuarios');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

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
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USERS_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const usersData = data["Gestion de Usuarios"];
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
    const handleEditUser = (userId) => {
        navigate(`/edit-user/${userId}`);
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
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Usuarios" showSearch={true} />
                <button className="create-button" onClick={handleCreateUser}>
                    <div className="left-bu">Crear nuevo usuario </div>
                    <div className="right-bu">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
                </button>
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
                            <button className='edit-button' onClick={() => handleEditUser(user.id)}>Editar</button>
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
