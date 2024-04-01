import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateClient = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Crear cliente');
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        id_unit_management: '',
        name: '',
        nickname:'',
        id_document_type:'',
        document_number:'',
        address:'',
        phone:'',
        city:'',
        email:'',
        birthdate:'',
        neighborhood:'',
        cellphone:'',
        economic_activity:'',
        id_user_management:'',
        payment_frequency:'',
        payment_terms:'',
        established_arrears:'',
        state: '0'
    });
    const [units, setUnits] = useState([]);
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UNITS_LIST_ENDPOINT}`);
                const data = await response.json();
                setUnits(data['Gestion de Unidades']);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchUnits();
    }, []);

    const [documentTypes, setdocumentType] = useState([]);
    useEffect(() => {
        const fetchDocumentType = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DOCUMENTS_LIST_ENDPOINT}`);
                const data = await response.json();
                setdocumentType(data['Tipos de Documentos']);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        fetchDocumentType();
    }, []);

    const toggleActive = () => {
        setIsActive(!isActive);
        setFormData({
            ...formData,
            state: !isActive ? '1' : '0'
        });
    }
    const handleChange = (e) => {
        const { id, value } = e.target;
        let newValue = value;
    
        if (id === 'name' || id === 'nickname' || id === 'city' || id === 'neighborhood' || id === 'economic_activity') {
            newValue = value.replace(/[^A-Za-z\s]/g, ''); 
        } else if (id === 'phone' || id === 'cellphone' || id === 'document_number') {
            newValue = value.replace(/\D/g, '');
        }
        setFormData({
            ...formData,
            [id]: newValue
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.id_unit_management || !formData.id_document_type || !formData.document_number) {
            console.error('Por favor, complete todos los campos obligatorios.');
            return;
            }
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_CUSTOMER_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Gestión de clientes"/>
                <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="income-fields">
                        <label htmlFor="id_unit_management">Unidad Asignada</label>
                        <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={formData.id_unit_management}>
                            <option value="">Seleccione Unidad</option>
                            {units.map(unit => (
                                <option key={unit.id} value={unit.id}>{unit.unit}</option>
                            ))}
                        </select>
                    </div>    
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <input type="text" id="name" name="name" placeholder="Ingrese el nombre completo" onChange={handleChange} value={formData.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickname">Apodo</label>
                        <input type="text" id="nickname" name="nickname" placeholder="Ingrese el apodo" onChange={handleChange} value={formData.nickname}/>
                    </div>
                    <div className="form-group">
                        <div className="income-fields">
                            <label htmlFor="id_document_type">Tipo Documento</label>
                            <select id="id_document_type" name="id_document_type" className="management-select" onChange={handleChange} value={formData.id_document_type}>
                                <option value="">Seleccione Tipo Documento</option>
                                {documentTypes.map(documentType => (
                                    <option key={documentType.id} value={documentType.id}>{documentType.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="document_number">Número de documento</label>
                        <input type="text" id="document_number" name="document_number" placeholder="Ingrese el número de documento" onChange={handleChange} value={formData.document_number}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" name="address" placeholder="Ingrese la dirección" onChange={handleChange} value={formData.address}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="text" id="phone" name="phone" placeholder="Ingrese el número de teléfono" onChange={handleChange} value={formData.phone}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" name="city" placeholder="Ingrese la ciudad" onChange={handleChange} value={formData.city}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" onChange={handleChange} value={formData.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Fecha de nacimiento</label>
                        <input type="date" id="birthdate" name="birthdate" placeholder="Ingrese la fecha de nacimiento" onChange={handleChange} value={formData.birthdate}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="neighborhood">Barrio</label>
                        <input type="text" id="neighborhood" name="neighborhood" placeholder="Ingrese el barrio" onChange={handleChange} value={formData.neighborhood}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cellphone">Celular</label>
                        <input type="text" id="cellphone" name="cellphone" placeholder="Ingrese el número de celular" onChange={handleChange} value={formData.cellphone}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="economic_activity">Actividad económica</label>
                        <input type="text" id="economic_activity" name="economic_activity" placeholder="Ingrese la actividad económica" onChange={handleChange} value={formData.economic_activity}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment_frequency">Frecuencia de pago</label>
                        <input type="text" id="payment_frequency" name="payment_frequency" placeholder="Ingrese la frecuencia de pago" onChange={handleChange} value={formData.payment_frequency}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment_terms">Plazos de pago</label>
                        <input type="text" id="payment_terms" name="payment_terms" placeholder="Ingrese los plazos de pago" onChange={handleChange} value={formData.payment_terms}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="established_arrears">Mora establecida</label>
                        <input type="text" id="established_arrears" name="established_arrears" placeholder="Ingrese la mora establecida" onChange={handleChange} value={formData.established_arrears}/>
                    </div>
                    <div className="form-group center">
                        <span className="switch-label">Estado</span>
                        <label htmlFor="activeSwitch" className="switch">
                            <input type="checkbox" id="activeSwitch" name="state" checked={isActive} onChange={toggleActive} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="create-button cancel" onClick={() => navigate('/client-management')}>Cancelar</button>
                        <button type="submit" className="create-button create" onClick={() => navigate('/client-management')}>Crear nuevo cliente</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default CreateClient;
