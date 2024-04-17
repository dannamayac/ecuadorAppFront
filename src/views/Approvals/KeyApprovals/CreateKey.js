import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const CreateKey = () => {
    const [pageTitle] = useState('Crear nueva clave');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessCenter: '',
        saleNumber: '',
        name: '',
        documentNumber: '',
        totalSale: '',
        pendingBalance: '',
        saleDate: '',
        overdueDays: '',
        paymentDate: '',
        status: { check: false, times: false }
    });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

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
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleCheckboxClick = (key) => {
        setFormData({
            ...formData,
            status: {
                ...formData.status,
                [key]: !formData.status[key]
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario
        console.log(formData);
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
                <Header title={pageTitle} backButtonPath="/key-approvals" startItem="General" />
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="businessCenter">Centro de negocios</label>
                            <input type="text" id="businessCenter" name="businessCenter" placeholder="Ingrese el centro de negocios" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="saleNumber">Número de venta</label>
                            <input type="text" id="saleNumber" name="saleNumber" placeholder="Ingrese el número de venta" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" placeholder="Ingrese el nombre" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="documentNumber">Número de documento</label>
                            <input type="text" id="documentNumber" name="documentNumber" placeholder="Ingrese el número de documento" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalSale">Total de venta</label>
                            <input type="text" id="totalSale" name="totalSale" placeholder="Ingrese el total de venta" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pendingBalance">Saldo pendiente</label>
                            <input type="text" id="pendingBalance" name="pendingBalance" placeholder="Ingrese el saldo pendiente" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="saleDate">Fecha de venta</label>
                            <input type="date" id="saleDate" name="saleDate" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="overdueDays">Días de mora</label>
                            <input type="number" id="overdueDays" name="overdueDays" placeholder="Ingrese los días de mora" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentDate">Fecha de pago</label>
                            <input type="date" id="paymentDate" name="paymentDate" onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{textAlign:'center'}}>
                            <label htmlFor="status">Estado</label>
                            <div className="checkbox-buttons">
                                <button className={`checkbox-button ${formData.status.check ? 'active-check' : ''}`} onClick={() => handleCheckboxClick('check')}>
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                </button>
                                <button className={`checkbox-button ${formData.status.times ? 'active-times' : ''}`} onClick={() => handleCheckboxClick('times')}>
                                    <FontAwesomeIcon icon={faTimes} className="times-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="management-buttons">
                        <button type="submit" className="create-button2 create">Guardar</button>
                        <button type="button" className="create-button2 cancel" onClick={() => navigate('/key-approvals')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateKey;
