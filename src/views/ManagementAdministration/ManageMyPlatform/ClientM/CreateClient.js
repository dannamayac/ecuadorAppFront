import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateClient = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear cliente');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        id_unit_management: '',
        name: '',
        nickname: '',
        id_document_type: '',
        document_number: '',
        address: '',
        phone: '',
        city: '',
        email: '',
        birthdate: '',
        neighborhood: '',
        cellphone: '',
        economic_activity: '',
        id_user_management: '',
        payment_frequency: '',
        payment_terms: '',
        established_arrears: '',
        state: '0'
    });
    const [units, setUnits] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});

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
                setUnits(data['Gestion de Unidades']);
            } catch (error) {
                console.error('Error fetching units:', error);
            }
        };
        fetchUnits();

        const fetchDocumentTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DOCUMENTS_LIST_ENDPOINT}`);
                const data = await response.json();
                setDocumentTypes(data['Tipos de Documentos']);
            } catch (error) {
                console.error('Error fetching document types:', error);
            }
        };
        fetchDocumentTypes();
    }, []);

    const toggleActive = () => {
        setIsActive(!isActive);
        setFormData({
            ...formData,
            state: !isActive ? '1' : '0'
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Verificar que se completen todos los campos obligatorios
        const requiredFields = ['name', 'id_unit_management', 'id_document_type', 'document_number'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });

        // Validar que los números de documento y teléfono sean numéricos
        const numericFields = ['document_number', 'phone', 'cellphone'];
        numericFields.forEach(field => {
            if (formData[field] && isNaN(formData[field])) {
                newErrors[field] = 'Este campo debe contener solo números';
            }
        });

        // Validar que el correo electrónico tenga un formato válido
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            newErrors.email = 'Ingrese un correo electrónico válido';
        }

        // Validar la fecha de nacimiento
        if (formData.birthdate) {
            const today = new Date();
            const birthdate = new Date(formData.birthdate);
            if (birthdate >= today) {
                newErrors.birthdate = 'La fecha de nacimiento debe ser anterior a la fecha actual';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrorMessages(newErrors);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_CUSTOMER_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            navigate('/client-management'); // Redirige a la vista general luego de crear el cliente
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const handleCancel = () => {
        navigate('/client-management'); 
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
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Gestión de clientes" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_unit_management">Unidad Asignada</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={formData.id_unit_management}>
                                <option value="">Seleccione Unidad</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                            {errorMessages.id_unit_management && <p className="error-message">{errorMessages.id_unit_management}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nombre completo</label>
                            <input type="text" id="name" name="name" placeholder="Ingrese el nombre completo" onChange={handleChange} value={formData.name} />
                            {errorMessages.name && <p className="error-message">{errorMessages.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">Apodo</label>
                            <input type="text" id="nickname" name="nickname" placeholder="Ingrese el apodo" onChange={handleChange} value={formData.nickname} />
                            {errorMessages.nickname && <p className="error-message">{errorMessages.nickname}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_document_type">Tipo Documento</label>
                            <select id="id_document_type" name="id_document_type" className="management-select" onChange={handleChange} value={formData.id_document_type}>
                                <option value="">Seleccione Tipo Documento</option>
                                {documentTypes.map(documentType => (
                                    <option key={documentType.id} value={documentType.id}>{documentType.name}</option>
                                ))}
                            </select>
                            {errorMessages.id_document_type && <p className="error-message">{errorMessages.id_document_type}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="document_number">Número de documento</label>
                            <input type="text" id="document_number" name="document_number" placeholder="Ingrese el número de documento" onChange={handleChange} value={formData.document_number} />
                            {errorMessages.document_number && <p className="error-message">{errorMessages.document_number}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <input type="text" id="address" name="address" placeholder="Ingrese la dirección" onChange={handleChange} value={formData.address} />
                            {errorMessages.address && <p className="error-message">{errorMessages.address}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text" id="phone" name="phone" placeholder="Ingrese el número de teléfono" onChange={handleChange} value={formData.phone} />
                            {errorMessages.phone && <p className="error-message">{errorMessages.phone}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Ciudad</label>
                            <input type="text" id="city" name="city" placeholder="Ingrese la ciudad" onChange={handleChange} value={formData.city} />
                            {errorMessages.city && <p className="error-message">{errorMessages.city}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" onChange={handleChange} value={formData.email} />
                            {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">Fecha de nacimiento</label>
                            <input type="date" id="birthdate" name="birthdate" placeholder="Ingrese la fecha de nacimiento" onChange={handleChange} value={formData.birthdate} />
                            {errorMessages.birthdate && <p className="error-message">{errorMessages.birthdate}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="neighborhood">Barrio</label>
                            <input type="text" id="neighborhood" name="neighborhood" placeholder="Ingrese el barrio" onChange={handleChange} value={formData.neighborhood} />
                            {errorMessages.neighborhood && <p className="error-message">{errorMessages.neighborhood}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cellphone">Celular</label>
                            <input type="text" id="cellphone" name="cellphone" placeholder="Ingrese el número de celular" onChange={handleChange} value={formData.cellphone} />
                            {errorMessages.cellphone && <p className="error-message">{errorMessages.cellphone}</p>}
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="economic_activity">Actividad económica</label>
                            <input type="text" id="economic_activity" name="economic_activity" placeholder="Ingrese la actividad económica" onChange={handleChange} value={formData.economic_activity} />
                            {errorMessages.economic_activity && <p className="error-message">{errorMessages.economic_activity}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address2">Dirección</label>
                            <input type="text" id="address2" name="address2" placeholder="Ingrese la dirección"/>
                            {errorMessages.address2 && <p className="error-message">{errorMessages.address2}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone2">Teléfono</label>
                            <input type="text" id="phone2" name="phone2" placeholder="Ingrese el teléfono" />
                            {errorMessages.phone2 && <p className="error-message">{errorMessages.phone2}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="userReference">Info de usuario referencia</label>
                            <input type="text" id="userReference" name="userReference" placeholder="Ingrese la info de usuario referencia" />
                            {errorMessages.userReference && <p className="error-message">{errorMessages.userReference}</p>}
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="payment_frequency">Frecuencia de pago</label>
                            <input type="text" id="payment_frequency" name="payment_frequency" placeholder="Ingrese la frecuencia de pago" onChange={handleChange} value={formData.payment_frequency} />
                            {errorMessages.payment_frequency && <p className="error-message">{errorMessages.payment_frequency}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment_terms">Plazos de pago</label>
                            <input type="text" id="payment_terms" name="payment_terms" placeholder="Ingrese los plazos de pago" onChange={handleChange} value={formData.payment_terms} />
                            {errorMessages.payment_terms && <p className="error-message">{errorMessages.payment_terms}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="established_arrears">Mora establecida</label>
                            <input type="text" id="established_arrears" name="established_arrears" placeholder="Ingrese la mora establecida" onChange={handleChange} value={formData.established_arrears} />
                            {errorMessages.established_arrears && <p className="error-message">{errorMessages.established_arrears}</p>}
                        </div>
                        <div className="form-group center">
                            <span className="switch-label">Estado</span>
                            <label htmlFor="activeSwitch" className="switch">
                                <input type="checkbox" id="activeSwitch" name="state" checked={isActive} onChange={toggleActive} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="management-buttons" style={{marginBottom: '20px'}}>
                        <button type="submit" className="create-button2 create">Crear nuevo cliente</button>
                        <button type="button" className="create-button2 cancel" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default CreateClient;
