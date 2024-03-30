import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateUser = () => {
    const [pageTitle] = useState('Crear usuario');
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
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://192.168.240.103:8000/api/Roles/listData');
                const data = await response.json();
                setRoles(data.Roles);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchRoles();
    }, []);

    const [units, setUnits] = useState([]);
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('http://192.168.240.103:8000/api/GestionUnidades/listData');
                const data = await response.json();
                setUnits(data['Gestion de Unidades']);
            } catch (error) {
                console.error('Error fetching states:', error);
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
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.240.103:8000/api/GestionUsuarios/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Usuario creado exitosamente');
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };
    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/user-management" startItem="Gestión de usuarios"/>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Ingrese el nombre" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_rol">Tipo de Usuario</label>
                        <select id="id_rol" name="id_rol" onChange={handleChange} value={formData.id_rol}>
                            <option value="">Seleccione un estado</option>
                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>{rol.name}</option>
                            ))}
                        </select>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="userEmail">Correo</label>
                        <input type="text" id="email" name="email" placeholder="Ingrese el correo" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhoneNumber">Número de celular</label>
                        <input type="text" id="celphone" name="celphone" placeholder="Ingrese el número de celular" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_unit_management">Unidad Asignada</label>
                        <select id="id_unit_management" name="id_unit_management" onChange={handleChange} value={formData.id_unit_management}>
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
                    <button type="submit" className="create-button create">Crear nuevo usuario</button>
                </form>
                <button className="create-button cancel">Cancelar</button>
            </div>
        </div>
    );
}

export default CreateUser;
