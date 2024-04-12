import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ExpensesStyles.css"

const Expenses = () => {
    const [pageTitle] = useState('Gastos');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();
    const [expensesData, setexpensesData] = useState({
        ugiDiaria: '',
        trabajador: '',
        tipoIngreso: '',
        valor: '',
        comentario: '',
        descripcion: ''
    });
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [incomeTypes, setIncomeTypes] = useState([]);

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

    const handleExpenseHistoryClick = () => {
        navigate('/expense-history');
    };

    const handleChange = (e) => {
        setexpensesData({
            ...expensesData,
            [e.target.id]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!expensesData.id_unit_management) {
            newErrors.id_unit_management = 'Por favor seleccione una unidad';
        }
        if (!expensesData.id_user_management) {
            newErrors.id_user_management = 'Por favor seleccione un trabajador';
        }
        if (!expensesData.id_income_type) {
            newErrors.id_income_type = 'Por favor seleccione un tipo de ingreso';
        }
        if (!expensesData.value) {
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
                body: JSON.stringify(expensesData)
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
                                    {/* Opciones para filtrar por unidad */}
                                </select>
                            </div>
                        </div>
                        <div className="title-container">
                            <h1 className="header-title">Nuevo gasto</h1>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button" onClick={handleExpenseHistoryClick}>Historial de ingresos
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <form onSubmit={handleSubmit}>
                        <div className="movement-type">
                            <div className="movementType-container">
                                <h2 className="sub-title">Tipo de movimiento</h2>
                            </div>
                            <div className="movement-options">
                                <input type="radio" id="gasto" name="movementType" value="gasto" />
                                <label htmlFor="gasto">Gasto</label>
                                <input type="radio" id="retiro" name="movementType" value="retiro" />
                                <label htmlFor="retiro">Retiro</label>
                            </div>
                        </div>
                        <div className="income-fields">
                            <div className="income-field">
                                <label htmlFor="ugiDiaria">UGI Diaria</label>
                                <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={expensesData.id_unit_management}>
                                    <option value="">Seleccione una unidad</option>
                                    {units.map(unit => (
                                        <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                    ))}
                                </select>
                                {errors.id_unit_management && <span className="error-message">{errors.id_unit_management}</span>}
                            </div>
                            <div className="income-field">
                            <label htmlFor="trabajador">Trabajador</label>
                            <select id="id_user_management" name="id_user_management" classname="management-selec" onChange={handleChange} value={expensesData.id_user_management}>
                                <option value="" disabled selected hidden>Seleccione trabajador</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.user_name}</option>
                                ))}
                            </select>
                            {errors.id_user_management && <span className="error-message">{errors.id_user_management}</span>}
                            </div>
                            <div className="income-field">
                                <label htmlFor="tipoIngreso">Tipo de egreso</label>
                                <select id="tipoIngreso" onChange={handleChange} value={expensesData.tipoIngreso}>
                                    <option value="" disabled selected hidden>Seleccione tipo de egreso</option>
                                    {/* opciones de Tipo de Ingreso */}
                                </select>
                            </div>
                            <div className="income-field">
                                <label htmlFor="valor">Valor</label>
                                <input type="text" id="valor" placeholder="Ingrese el valor" onChange={handleChange} value={expensesData.valor} />
                                {errors.valor && <p className="error-message">{errors.valor}</p>}
                            </div>
                            <div className="income-field">
                                <label htmlFor="comentario">Comentario</label>
                                <input type="text" id="comentario" placeholder="Ingrese un comentario" onChange={handleChange} value={expensesData.comentario} />
                            </div>
                            <div className="income-field">
                                <label htmlFor="descripcion">Descripción</label>
                                <input type="text" id="descripcion" placeholder="Ingrese una descripción" onChange={handleChange} value={expensesData.descripcion} />
                            </div>
                        </div>
                        <div className="income-buttons-container">
                            <div className="attach-files">
                                <button className="attach-button">
                                    <FontAwesomeIcon icon={faUpload} /> Adjuntar archivos<span>+</span>
                                </button>
                            </div>
                            <div className="management-buttons">
                                <button type="submit" className="create-button2 create">Guardar gasto</button>
                                <button type="button" className="create-button2 cancel" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
