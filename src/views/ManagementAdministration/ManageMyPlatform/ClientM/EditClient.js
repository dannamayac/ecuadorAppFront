import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const EditClient = () => {
    const { id } = useParams();
    const [pageTitle] = useState('Editar cliente');
    const [isActive, setIsActive] = useState(false);
    const [CustomerData, setCustomerData] = useState({
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

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CUSTOMER_INFO_ENDPOINT}/${id}`)
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del cliente');
                }
                const customerData = await response.json();
                setCustomerData(customerData);
            } catch (error) {
                console.error('Error al obtener la información del cliente:', error);
            }
        };

        fetchCustomerData();

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
    }, [id]);

    const toggleActive = () => {
        setIsActive(!isActive);
        setCustomerData({
            ...CustomerData,
            state: !isActive ? '1' : '0'
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        let newValue = value;

        if (id === 'name' || id === 'nickname' || id === 'city' || id === 'neighborhood' || id === 'economic_activity') {
            newValue = value.replace(/[^A-Za-z\s]/g, '');
        } else if (id === 'phone' || id === 'cellphone' || id === 'document_number') {
            newValue = value.replace(/\D/g, '');
        }
        setCustomerData({
            ...CustomerData,
            [id]: newValue
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!CustomerData.name) {
            newErrors.name = 'Por favor ingrese el nombre';
        }
        if (!CustomerData.id_unit_management) {
            newErrors.id_unit_management = 'Por favor seleccione una unidad';
        }
        if (!CustomerData.id_document_type) {
            newErrors.id_document_type = 'Por favor seleccione un tipo de documento';
        }
        if (!CustomerData.document_number) {
            newErrors.document_number = 'Por favor ingrese el número de documento';
        } else if (isNaN(CustomerData.document_number)) {
            newErrors.document_number = 'El número de documento debe ser numérico';
        }
        if (!CustomerData.phone) {
            newErrors.phone = 'Por favor ingrese el número de teléfono';
        } else if (isNaN(CustomerData.phone)) {
            newErrors.phone = 'El número de teléfono debe ser numérico';
        }
        if (!CustomerData.cellphone) {
            newErrors.cellphone = 'Por favor ingrese el número de celular';
        } else if (isNaN(CustomerData.cellphone)) {
            newErrors.cellphone = 'El número de celular debe ser numérico';
        }
    
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EDIT_CUSTOMER_ENDPOINT}/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(CustomerData)
                });
                const data = await response.json();
                if (data.status === 200) {
                    alert('Cliente actualizado exitosamente');
                } else {
                    alert('Error al actualizar el cliente');
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Error al enviar el formulario');
            }
        }
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Gestión de clientes" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="clientUnit">Unidad</label>
                            <select id="clientUnit" name="clientUnit" className="management-select" value={CustomerData.id_unit_management} onChange={handleChange}>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="clientName">Nombre completo</label>
                            <input type="text" id="name" value={CustomerData.name} onChange={handleChange} placeholder="Ingrese el nombre completo" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">Apodo</label>
                            <input type="text" id="nickname" value={CustomerData.nickname} onChange={handleChange} placeholder="Ingrese el apodo" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="documentType">Tipo de documento</label>
                            <select id="id_document_type" name="id_document:type" className="management-select" value={CustomerData.id_document_type} onChange={handleChange}>
                                {documentTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idNumber">Número de documento</label>
                            <input type="text" id="document_number" value={CustomerData.document_number} onChange={handleChange} placeholder="Ingrese el número de documento" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <input type="text" id="address" value={CustomerData.address} onChange={handleChange} placeholder="Ingrese la dirección" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Teléfono</label>
                            <input type="text" id="phone" value={CustomerData.phone} onChange={handleChange} placeholder="Ingrese el número de teléfono" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Ciudad</label>
                            <input type="text" id="city" value={CustomerData.city} onChange={handleChange} placeholder="Ingrese la ciudad" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="e-mail">Correo electrónico</label>
                            <input type="email" id="email" value={CustomerData.email} onChange={handleChange} placeholder="Ingrese el correo electrónico" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">Fecha de nacimiento</label>
                            <input type="date" id="birthdate" value={CustomerData.birthdate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="neighborhood">Barrio</label>
                            <input type="text" id="neighborhood" value={CustomerData.neighborhood} onChange={handleChange} placeholder="Ingrese el barrio" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cellphone">Celular</label>
                            <input type="text" id="cellphone" value={CustomerData.cellphone} onChange={handleChange} placeholder="Ingrese el número de celular" />
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="economicActivity">Actividad económica</label>
                            <input type="text" id="economic_activity" value={CustomerData.economic_activity} onChange={handleChange} placeholder="Ingrese la actividad económica" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userReference">Info de usuario de referencia</label>
                            <input type="text" id="id_user_management" value={CustomerData.id_user_management} onChange={handleChange} placeholder="Ingrese el usuario de referencia" />
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="paymentFrequency">Frecuencia de pago</label>
                            <input type="text" id="payment_frequency" value={CustomerData.payment_frequency} onChange={handleChange} placeholder="Ingrese la frecuencia de pago" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentTerms">Plazos de pago</label>
                            <input type="text" id="payment_terms" value={CustomerData.payment_terms} onChange={handleChange} placeholder="Ingrese los plazos de pago" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="establishedArrears">Mora establecida</label>
                            <input type="text" id="established_arrears" value={CustomerData.established_arrears} onChange={handleChange} placeholder="Ingrese la mora establecida" />
                        </div>
                        <div className="form-group center">
                            <span className="switch-label">Estado</span>
                            <label htmlFor="activeSwitch" className="switch">
                                <input type="checkbox" id="activeSwitch" checked={isActive} onChange={toggleActive} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create" >Guardar ingreso</button>
                        <button type="button" className="create-button2 cancel" >Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );    
}

export default EditClient;
