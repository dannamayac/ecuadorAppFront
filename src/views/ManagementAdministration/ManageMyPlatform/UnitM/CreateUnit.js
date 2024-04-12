import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateUnit = () => {
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear nueva unidad');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.unit) {
            newErrors.unit = 'Por favor ingrese el nombre de la unidad';
        }
        if (!formData.code) {
            newErrors.code = 'Por favor ingrese el código';
        }
        if (!formData.location) {
            newErrors.location = 'Por favor ingrese la ubicación';
        }
        if (!formData.id_state) {
            newErrors.id_state = 'Por favor seleccione un estado';
        }
        if (!formData.id_user_management) {
            newErrors.id_user_management = 'Por favor seleccione un Administrador';
        }
        if (!formData.established_default) {
            newErrors.established_default = 'Por favor ingrese la mora establecida';
        }
        if (!formData.id_partner_management) {
            newErrors.id_partner_management = 'Por favor seleccione un Socio';
        }
        if (!formData.percentage) {
            newErrors.percentage = 'Por favor ingrese el porcentaje';
        }

        const numericPattern = /^\d+$/;
        if (!numericPattern.test(formData.code)) {
            newErrors.code = 'El código debe ser un valor numérico';
        }
        if (!numericPattern.test(formData.established_default)) {
            newErrors.established_default = 'La Mora Establecida debe ser un valor numérico';
        }

        // Validar que el campo "Porcentaje" contenga solo números y esté en el rango adecuado
        const percentagePattern = /^\d+$/;
        if (!percentagePattern.test(formData.percentage) || parseFloat(formData.percentage) < 0 || parseFloat(formData.percentage) > 100) {
            newErrors.percentage = 'El porcentaje debe ser un número entre 0 y 100';
        }

        // Validar la longitud máxima de los campos de texto
        const maxFieldLength = {
            unit: 50,
            code: 50,
            location: 50
        };
        Object.entries(maxFieldLength).forEach(([field, maxLength]) => {
            if (formData[field].length > maxLength) {
                newErrors[field] = `Este campo no puede tener más de ${maxLength} caracteres`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrorMessages(newErrors);
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
                <Header title={pageTitle} backButtonPath="/unit-management" startItem="Unidades" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="unit">Nombre unidad</label>
                            <input type="text" id="unit" name="unit" placeholder="Ingrese el nombre de la unidad" onChange={handleChange} />
                            {errorMessages.unit && <p className="error-message">{errorMessages.unit}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="code">Código</label>
                            <input type="text" id="code" name="code" placeholder="Ingrese el código" onChange={handleChange} />
                            {errorMessages.code && <p className="error-message">{errorMessages.code}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Ubicación</label>
                            <input type="text" id="location" name="location" placeholder="Ingrese la ubicación" onChange={handleChange} />
                            {errorMessages.location && <p className="error-message">{errorMessages.location}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_state">Estado</label>
                            <select id="id_state" name="id_state" className="management-select" onChange={handleChange} value={formData.id_state}>
                                <option value="">Seleccione un estado</option>
                                {states.map(state => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                            {errorMessages.id_state && <p className="error-message">{errorMessages.id_state}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_user_management">Asignar administrador</label>
                            <select id="id_user_management" name="id_user_management" className="management-select" onChange={handleChange} value={formData.id_user_management}>
                                <option value="">Seleccione un Administrador</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errorMessages.id_user_management && <p className="error-message">{errorMessages.id_user_management}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="established_default">Mora establecida</label>
                            <input type="text" id="established_default" name="established_default" placeholder="Ingrese la mora establecida" onChange={handleChange} />
                            {errorMessages.established_default && <p className="error-message">{errorMessages.established_default}</p>}
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
                            {errorMessages.id_partner_management && <p className="error-message">{errorMessages.id_partner_management}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="percentage">%</label>
                            <input type="text" id="percentage" name="percentage" placeholder="Ingrese el %" onChange={handleChange} />
                            {errorMessages.percentage && <p className="error-message">{errorMessages.percentage}</p>}
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create">Guardar ingreso</button>
                        <button type="button" className="create-button2 cancel" onClick={() => navigate('/unit-management')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUnit;
