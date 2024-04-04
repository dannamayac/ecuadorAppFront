import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar';
import Header from '../../../../components/Header';
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css";

const UserType = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear nuevo usuario');
    const [formData, setFormData] = useState({
        id_rol: '',
    });
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ROLES_LIST_ENDPOINT}`);
                const data = await response.json();
                setRoles(data.Roles);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.id_rol || !formData.email || !formData.celphone || !formData.id_unit_management) {
            alert('Por favor complete todos los campos');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_USER_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Usuario creado exitosamente');
                navigate('/user-management');
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleNextClick = () => {
        navigate('/create-user');
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/user-management" startItem="Gestión de usuarios" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_rol">Tipo de Usuario</label>
                            <select id="id_rol" name="id_rol" className="management-select" onChange={handleChange} value={formData.id_rol}>
                                <option value="">Seleccione un rol</option>
                                {roles.map(rol => (
                                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create" onClick={handleNextClick} style={{marginRight:'30px'}}>Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserType;
