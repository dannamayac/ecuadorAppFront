import React, { useState, useEffect } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/IncomeStyles.css"

const Income = () => {
    const [pageTitle] = useState('Ingresos');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();
    const [incomeData, setIncomeData] = useState({
        id_unit_management:'',
        cash:'',
        id_user_management:'',
        id_income_type:'',
        value:'',
        date:'',
        comment:'',
        description:''
    });
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [incomeTypes, setIncomeTypes] = useState([]);

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
        const fetchUnits = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UNITS_LIST_ENDPOINT}`);
                const data = await response.json();
                setUnits(data["Gestion de Unidades"]);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchUnits();

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USERS_LIST_ENDPOINT}`);
                const data = await response.json();
                setUsers(data["Gestion de Usuarios"]);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchUsers();

        const fetchIncomeType = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_INCOME_TYPE_LIST_ENDPOINT}`);
                const data = await response.json();
                setIncomeTypes(data["Tipo de Ingresos"]);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchIncomeType();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!incomeData.id_unit_management) {
            newErrors.id_unit_management = 'Por favor seleccione una unidad';
        }
        if (!incomeData.id_user_management) {
            newErrors.id_user_management = 'Por favor seleccione un trabajador';
        }
        if (!incomeData.id_income_type) {
            newErrors.id_income_type = 'Por favor seleccione un tipo de ingreso';
        }
        if (!incomeData.value) {
            newErrors.value = 'Por favor ingrese el valor';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_INCOME_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(incomeData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Ingreso creado exitosamente');
                navigate('/income-history');
            } else {
                alert('Error al crear el ingreso');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

    const handleChange = (e) => {
        setIncomeData({
            ...incomeData,
            [e.target.id]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    };

    const handleExpenseHistoryClick = () => {
        navigate('/income-history');
    }

    const handleCancel = () => {
        navigate('/management-administration'); 
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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General"/>
                <div className="income-header">
                    <div className="left-title">
                        <div className="filter-fields">
                            <div className="filter-field">
                                <select id="filterByIdOrField" className="filter-select">
                                    <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                    <option value="id">ID</option>
                                    <option value="field">Campo</option>
                                </select>
                            </div>
                            <div className="filter-field">
                                <select id="filterByUnit" className="filter-select">
                                    <option value="" disabled selected hidden>Todas las unidades:</option>
                                </select>
                            </div>
                        </div>
                        <div className="title-container">
                            <h1 className="header-title">Nuevo Ingreso</h1>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button" onClick={handleExpenseHistoryClick}>Historial de ingresos
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <form className="income-form" onSubmit={handleSubmit}>
                    <div className="income-fields">
                        <div className="income-field">
                            <label htmlFor="ugiDiaria">UGI Diaria</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={incomeData.id_unit_management}>
                                <option value="">Seleccione una unidad</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                            {errors.id_unit_management && <span className="error-message">{errors.id_unit_management}</span>}
                        </div>
                        
                        <div className="income-field">
                            <label htmlFor="trabajador">Trabajador</label>
                            <select id="id_user_management" name="id_user_management" classname="management-selec" onChange={handleChange} value={incomeData.id_user_management}>
                                <option value="" disabled selected hidden>Seleccione trabajador</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.user_name}</option>
                                ))}
                            </select>
                            {errors.id_user_management && <span className="error-message">{errors.id_user_management}</span>}
                        </div>
                        <div className="income-field">
                            <label htmlFor="id_income_type">Tipo de Ingreso</label>
                            <select id="id_income_type" name="id_income_type" classname="management-selec" onChange={handleChange} value={incomeData.id_income_type}>
                                <option value="" disabled selected hidden>Seleccione tipo de ingreso</option>
                                {incomeTypes.map(incomeType => (
                                    <option key={incomeType.id} value={incomeType.id}>{incomeType.name}</option>
                                ))}
                            </select>
                            {errors.id_income_type && <span className="error-message">{errors.id_income_type}</span>}
                        </div>
                        <div className="income-field">
                            <label htmlFor="value">Valor</label>
                            <input type="text" id="value" name="value" placeholder="Ingrese el valor" onChange={handleChange}/>
                            {errors.value && <span className="error-message">{errors.value}</span>}
                        </div>
                        <div className="income-field">
                            <label htmlFor="comment">Comentario</label>
                            <input type="text" id="comment" name="comment" placeholder="Ingrese un comentario" onChange={handleChange}/>
                        </div>
                        <div className="income-field">
                            <label htmlFor="description">Descripción</label>
                            <input type="text" id="description" name="description" placeholder="Ingrese una descripción" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="income-buttons-container">
                        <div className="attach-files">
                            <button className="attach-button">
                                <FontAwesomeIcon icon={faUpload} /> Adjuntar archivos<span>+</span>
                            </button>
                        </div>
                        <div className="management-buttons">
                            <button type="submit" className="create-button2 create">Guardar ingreso</button>
                            <button type="button" className="create-button2 cancel" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Income;
