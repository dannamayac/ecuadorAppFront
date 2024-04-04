import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateUnit = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear nueva unidad');
    const [formData, setFormData] = useState({
        unit: '',
        code: '',
        location: '',
        id_state: '',
        id_user_management: '',
        established_default: '',
        id_partner_management: '',
        percentage: ''
    });
    const [states, setStates] = useState([]);
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_STATE_LIST_ENDPOINT}`);
                const data = await response.json();
                setStates(data.Estados);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchStates();
    }, []);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LIST_ADMIN_USERS_ENDPOINT}`);
                const data = await response.json();
                setUsers(data.Administradores);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchUsers();
    }, []);
    const [partners, setPartners] = useState([]);
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PARTNERS_LIST_ENDPOINT}`);
                const data = await response.json();
                setPartners(data.Socios);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchPartners();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (!formData.unit || !formData.code || !formData.location || !formData.id_state || !formData.id_user_management || !formData.established_default || !formData.id_partner_management || !formData.percentage) {
            alert('Por favor complete todos los campos');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_UNIT_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Unidad creada exitosamente');
                navigate('/unit-management');
            } else {
                alert('Error al crear la unidad');
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
                <Header title={pageTitle} backButtonPath="/unit-management" startItem="Unidades" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="unit">Nombre unidad</label>
                            <input type="text" id="unit" name="unit" placeholder="Ingrese el nombre de la unidad" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="code">Código</label>
                            <input type="text" id="code" name="code" placeholder="Ingrese el código" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Ubicación</label>
                            <input type="text" id="location" name="location" placeholder="Ingrese la ubicación" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_state">Estado</label>
                            <select id="id_state" name="id_state" className="management-select" onChange={handleChange} value={formData.id_state}>
                                <option value="">Seleccione un estado</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_user_management">Asignar administrador</label>
                            <select id="id_user_management" name="id_user_management" className="management-select" onChange={handleChange} value={formData.id_user_management}>
                                <option value="">Seleccione un Administrador</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="established_default">Mora establecida</label>
                            <input type="text" id="established_default" name="established_default" placeholder="Ingrese la mora establecida" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_partner_management">Socio</label>
                            <select id="id_partner_management" name="id_partner_management" className="management-select" onChange={handleChange} value={formData.id_partner_management}>
                                <option value="">Seleccione un Socio</option>
                                {partners.map(partner => (
                                    <option key={partner.id} value={partner.id}>{partner.partnert_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="percentage">%</label>
                            <input type="text" id="percentage" name="percentage" placeholder="Ingrese el %" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create" onClick={handleSubmit}>Guardar ingreso</button>
                        <button type="button" className="create-button2 cancel" onClick={() => navigate('/unit-management')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUnit;
