import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar';
import Header from '../../../../components/Header';
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css";

const CreateUser = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear nuevo usuario');
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        id_rol: '',
        id_unit_management: '',
        email: '',
        celphone: '',
        state: '0'
    });
    const [roles, setRoles] = useState([]);
    const [units, setUnits] = useState([]);

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

        const fetchUnits = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UNITS_LIST_ENDPOINT}`);
                const data = await response.json();
                setUnits(data['Gestion de Unidades']);
            } catch (error) {
                console.error('Error fetching units:', error);
            }
        };
        fetchUnits();
    }, []);

    const toggleActive = () => {
        setIsActive(!isActive);
        setFormData({
            ...formData,
            state: !isActive ? '1' : '0'
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

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

    const handleCancel = () => {
        navigate('/user-management');
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/user-type" startItem="Gestión de usuarios" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" placeholder="Ingrese el nombre" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_rol">Tipo de Usuario</label>
                            <select id="id_rol" name="id_rol" className="management-select" onChange={handleChange} value={formData.id_rol}>
                                <option value="">Seleccione un rol</option>
                                {roles.map(rol => (
                                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input type="text" id="email" name="email" placeholder="Ingrese el correo" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="celphone">Número de celular</label>
                            <input type="text" id="celphone" name="celphone" placeholder="Ingrese el número de celular" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_unit_management">Unidad Asignada</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={formData.id_unit_management}>
                                <option value="">Seleccione una unidad</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <span className="switch-label">Estado</span>
                            <label htmlFor="userActiveSwitch" className="switch">
                                <input type="checkbox" id="userActiveSwitch" checked={isActive} onChange={toggleActive} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create">Guardar ingreso</button>
                        <button type="button" className="create-button2 cancel" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
