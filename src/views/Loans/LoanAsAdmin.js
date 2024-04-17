import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, } from '@fortawesome/free-solid-svg-icons'
import 'react-calendar/dist/Calendar.css'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import "../../styles/Loans/LoansStyles.css"

const LoanAsAdmin = () => {
    const [pageTitle] = useState('Realización de un préstamo');
    const [searchActive, setSearchActive] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [user, setUser] = useState({ id: 1, isActive: false });
    const [errorMessages, setErrorMessages] = useState([]);
    const [formData, setFormData] = useState({
        mode: '',
        type: '',
        document: '',
        established_amount: '',
        dues: '',
        taxes: '',
        admin_value: '',
        close_value: '',
        payment_frequency: '',
        contract_amount: '',
        months: '',
        total_to_pay: ''
    });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.mode) {
            newErrors.mode = 'Por favor seleccione un modo';
        }
        if (!formData.type) {
            newErrors.type = 'Por favor seleccione un tipo';
        }
        if (!formData.document) {
            newErrors.document = 'Por favor seleccione un documento';
        }
        // Agrega el resto de tus validaciones aquí
        const numericPattern = /^\d+$/;
        if (!numericPattern.test(formData.code)) {
            newErrors.code = 'El código debe ser un valor numérico';
        }
        if (!numericPattern.test(formData.established_default)) {
            newErrors.established_default = 'La Mora Establecida debe ser un valor numérico';
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
    };

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
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
                <Header title={pageTitle} backButtonPath="/home" startItem="General" />
                <div className="income-header">
                    <div className='filters filters-approvals' style={{marginTop:'-10px'}}>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input2" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
                        <div className="income-form filter-form-inline">
                            <div className="filter-field filter-field-insurance">
                                <select id="filterByIdOrField" className="filter-select select-insurance">
                                    <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                    <option value="id">ID</option>
                                    <option value="field">Campo</option>
                                </select>
                            </div>
                            <div className="filter-field filter-field-insurance">
                                <select id="filterByUnit" className="filter-select select-insurance" >
                                    <option value="" disabled selected hidden>Todas las unidades:</option>
                                    {/* Opciones para filtrar por unidad */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="left-title">
                        <div className="subTitle-container">
                            <h1 className="header-title">Préstamo</h1>
                        </div>
                    </div>
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="mode">Modo</label>
                            <select id="mode" name="mode" className="management-select" onChange={handleChange} >
                                <option value="">Nuevo</option>
                            </select>
                            {errorMessages.mode && <p className="error-message">{errorMessages.mode}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Tipo</label>
                            <select id="type" name="type" className="management-select" onChange={handleChange} >
                                <option value="">Personal</option>
                            </select>
                            {errorMessages.type && <p className="error-message">{errorMessages.type}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="document">Documento</label>
                            <select id="document" name="document" className="management-select" onChange={handleChange} >
                                <option value="">Contrato de préstamo</option>
                            </select>
                            {errorMessages.document && <p className="error-message">{errorMessages.document}</p>}
                        </div>
                        <div className="left-title">
                            <div className="subTitle-container">
                                <h1 className="header-title">Parámetros</h1>
                            </div>
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="established_amount">Monto emitido</label>
                            <input type="text" id="established_amount" name="established_amount" placeholder="$0" onChange={handleChange} />
                            {errorMessages.established_amount && <p className="error-message">{errorMessages.established_amount}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="dues">Cuotas</label>
                            <input type="text" id="dues" name="dues" placeholder="0" onChange={handleChange} />
                            {errorMessages.dues && <p className="error-message">{errorMessages.dues}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="taxes">Interés/Mes</label>
                            <input type="text" id="taxes" name="taxes" placeholder="0" onChange={handleChange} />
                            {errorMessages.taxes && <p className="error-message">{errorMessages.taxes}</p>}
                        </div>
                        <div className="form-group percentage-input">
                            <label htmlFor="taxes">Interés/Mes</label>
                            <div className="input-group">
                                <input type="number" id="taxes" name="taxes" placeholder="0" onChange={handleChange} />
                                <span className="input-addon">%</span>
                            </div>
                        </div>
                        <div className="form-group percentage-input">
                            <label htmlFor="admin_value">Cost. Admin</label>
                            <div className="input-group">
                                <input type="number" id="admin_value" name="admin_value" placeholder="0" onChange={handleChange} />
                                <span className="input-addon">%</span>
                            </div>
                        </div>
                        <div className="form-group percentage-input">
                            <label htmlFor="close_value">Cost. Cierre</label>
                            <div className="input-group">
                                <input type="number" id="close_value" name="close_value" placeholder="0" onChange={handleChange} />
                                <span className="input-addon">%</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contract_amount">Monto contrato</label>
                            <input type="text" id="contract_amount" name="contract_amount" placeholder="$0" onChange={handleChange} />
                            {errorMessages.contract_amount && <p className="error-message">{errorMessages.contract_amount}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="months">Meses</label>
                            <input type="text" id="months" name="months" placeholder="$0" onChange={handleChange} />
                            {errorMessages.months && <p className="error-message">{errorMessages.months}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_to_pay">Total a pagar</label>
                            <input type="text" id="total_to_pay" name="total_to_pay" placeholder="$0" onChange={handleChange} />
                            {errorMessages.total_to_pay && <p className="error-message">{errorMessages.total_to_pay}</p>}
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create">Crear venta</button>
                    </div>
                </form>
                <div className="table-container">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>Cuota</th>
                                <th>Pago</th>
                                <th>Vence</th>
                                <th>Capital</th>
                                <th>Intereses</th>
                                <th>Iva</th>
                                <th>Cost. Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>500.000</td>
                                <td>01/23/24</td>
                                <td>1.000.000</td>
                                <td>2%</td>
                                <td>19%</td>
                                <td>0.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LoanAsAdmin;