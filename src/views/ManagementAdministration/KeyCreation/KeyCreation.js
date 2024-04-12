import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/KeyCreationStyles.css"

const KeyCreation = () => {
    const [pageTitle] = useState('Creación de llaves');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

    const handleKeyCreationHistoryClick = () => {
        navigate('/key-creation-history');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar las validaciones antes de enviar los datos
        if (!value || isNaN(parseFloat(value))) {
            setErrorMessage('Por favor ingrese un valor numérico válido.');
            return;
        } else {
            setErrorMessage('');
        }
        // Si las validaciones pasan, puedes continuar con el envío de los datos
        // Por ejemplo, aquí puedes enviar los datos a través de una solicitud HTTP
    };

    const handleChange = (e) => {
        setValue(e.target.value);
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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General" />
                <div className="income-header2">
                    <div className="left-title">
                        <div className="filter-fields2">
                            <div className="filter-field">
                                <label htmlFor="filterByIdOrField">Unidad</label>
                                <select id="filterByIdOrField" className="filter-select">
                                    <option value="" disabled selected hidden>Seleccionar unidad</option>
                                    <option value="id">Unidad 1</option>
                                    <option value="field">Unidad 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button" onClick={handleKeyCreationHistoryClick}>Historico de aprobación
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <form onSubmit={handleSubmit}>
                        <div className="select-type">
                            <div className="selectType-container">
                                <h2 className="sub-title">Seleccione tipo</h2>
                            </div>
                            <div className="type-options">
                                <input type="radio" id="sales" name="selectType" value="sales" />
                                <label htmlFor="sales">Ventas</label>
                            </div>
                            <div className="type-options">
                                <input type="radio" id="salesPayment" name="selectType" value="salesPayment" />
                                <label htmlFor="salesPayment">Pago ventas</label>
                            </div>
                            <div className="type-options">
                                <input type="radio" id="unitExpenses" name="selectType" value="unitExpenses" />
                                <label htmlFor="unitExpenses">Gastos unidad</label>
                            </div>
                        </div>
                        <div className="income-fields2">
                            <div className="income-field">
                                <label htmlFor="value">Valor</label>
                                <input type="text" id="value" placeholder="0" value={value} onChange={handleChange} />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                        </div>
                        <div className="income-buttonsK">
                            <button type="submit" className="create-button2 create">Crear llave</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KeyCreation;
