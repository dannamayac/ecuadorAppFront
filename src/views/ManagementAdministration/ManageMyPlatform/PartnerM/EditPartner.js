import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const EditPartner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pageTitle] = useState('Editar socio');
    const [isActive, setIsActive] = useState(false);
    const [partnerData, setPartnerData] = useState({
        name: '',
        id_unit_management: '',
        share_percentage: '',
        email: '',
        state: '0'
    });
    const [units, setUnits] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPartnerData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PARTNER_INFO_ENDPOINT}/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del socio');
                }
                const partnerData = await response.json();
                setPartnerData(partnerData);
            } catch (error) {
                console.error('Error al obtener la información del socio:', error);
            }
        };

        fetchPartnerData();
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

    const toggleActive = () => {
        setIsActive(!isActive);
        setPartnerData({
            ...partnerData,
            state: !isActive ? '1' : '0'
        });
    };

    const handleChange = (e) => {
        setPartnerData({
            ...partnerData,
            [e.target.id]: e.target.value
        });

        // Limpiar el mensaje de error al cambiar el valor del campo
        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!partnerData.name) {
            newErrors.name = 'Por favor ingrese el nombre';
        }
        if (!partnerData.share_percentage) {
            newErrors.share_percentage = 'Por favor ingrese el porcentaje accionario';
        } else if (isNaN(partnerData.share_percentage)) {
            newErrors.share_percentage = 'El porcentaje accionario debe ser numérico';
        }
        if (!partnerData.email) {
            newErrors.email = 'Por favor ingrese el correo';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EDIT_PARTNER_ENDPOINT}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(partnerData)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Socio Actualizado exitosamente');
                navigate('/partner-management');
            } else {
                alert('Error al crear el socio');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

    const handleCancel = () => {
        navigate('/partner-management');
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/partner-management" startItem="Gestión de socios" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" placeholder="Ingrese el nombre" value={partnerData.name} onChange={handleChange} />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input type="text" id="email" name="email" placeholder="Ingrese el correo" value={partnerData.email} onChange={handleChange} />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="id_unit_management">Unidad Asignada</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={partnerData.id_unit_management}>
                                <option value="">Seleccione una unidad</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="share_percentage">Porcentaje accionario</label>
                            <input type="text" id="share_percentage" name="share_percentage" placeholder="Ingrese el porcentaje accionario" value={partnerData.share_percentage} onChange={handleChange} />
                            {errors.share_percentage && <p className="error-message">{errors.share_percentage}</p>}
                        </div>
                        <div className="form-group">
                            <span className="switch-label">Estado</span>
                            <label htmlFor="partnerActiveSwitch" className="switch">
                                <input type="checkbox" id="partnerActiveSwitch" checked={isActive} onChange={toggleActive} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create" >Guardar ingreso</button>
                        <button type="button" className="create-button2 cancel" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPartner;
