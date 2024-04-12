import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const EditUser = () => {
    const { id } = useParams();
    const [pageTitle] = useState('Editar usuario');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        id_rol: '',
        id_unit_management: '',
        email: '',
        celphone: '',
        state: '0'
    });
    const [roles, setRoles] = useState([]);
    const [units, setUnits] = useState([]);
    const [errors, setErrors] = useState({});

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
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_INFO_USER_ENDPOINT}/${id}`)
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del usuario');
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        fetchUserData();

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
    }, [id]);

    useEffect(() => {
        setIsActive(userData.state === '1');
    }, [userData.state]);

    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
        setUserData({
            ...userData,
            state: isActive ? '0' : '1'
        });
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validar que el campo "Número de celular" contenga solo números
        const celphonePattern = /^\d+$/;
        if (!celphonePattern.test(userData.celphone)) {
            newErrors.celphone = 'Este campo solo puede contener números';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EDIT_USER_ENDPOINT}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Usuario actualizado exitosamente');
            } else {
                alert('Error al actualizar el usuario');
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
                <Header title={pageTitle} backButtonPath="/user-management" startItem="Gestión de usuarios" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="userName">Nombre</label>
                            <input type="text" id="name" name="name" placeholder="Ingrese el nombre" value={userData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_rol">Tipo de Usuario</label>
                            <select id="id_rol" name="id_rol" className="management-select" onChange={handleChange} value={userData.id_rol}>
                                <option value="">Seleccione un tipo de usuario</option>
                                {roles.map(rol => (
                                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                                ))}
                            </select>
                            {errors.id_rol && <span className="error-message">{errors.id_rol}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="userEmail">Correo</label>
                            <input type="text" id="email" name="email" placeholder="Ingrese el correo" value={userData.email} onChange={handleChange} />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="userPhoneNumber">Número de celular</label>
                            <input type="text" id="celphone" name="celphone" placeholder="Ingrese el número de celular" value={userData.celphone} onChange={handleChange} />
                            {errors.celphone && <span className="error-message">{errors.celphone}</span>}
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_unit_management">Unidad Asignada</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={userData.id_unit_management}>
                                <option value="">Seleccione una unidad asignada</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                            {errors.id_unit_management && <span className="error-message">{errors.id_unit_management}</span>}
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
                        <button type="button" className="create-button2 cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
