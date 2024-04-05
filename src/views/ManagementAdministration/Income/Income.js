import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/IncomeStyles.css"

const Income = () => {
    const [pageTitle] = useState('Ingresos');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ugiDiaria: '',
        trabajador: '',
        tipoIngreso: '',
        valor: '',
        comentario: '',
        descripcion: ''
    });
    const [errors, setErrors] = useState({});

    const handleExpenseHistoryClick = () => {
        navigate('/income-history');
    }

    const handleCancel = () => {
        navigate('/management-administration'); 
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

        // Limpiar el mensaje de error al cambiar el valor del campo
        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validar que el campo "Valor" contenga solo números
        const numericPattern = /^\d+$/;
        if (!numericPattern.test(formData.valor)) {
            newErrors.valor = 'El valor debe ser numérico';
        }

        // Actualizar el estado de los errores
        setErrors(newErrors);

        // Si hay errores, no se envía el formulario
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Aquí puedes enviar el formulario si no hay errores
        // Ejemplo: fetch('URL', { method: 'POST', body: JSON.stringify(formData) })
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
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
                            <h1 className="header-title">Nuevo Ingreso</h1>
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
                        <div className="income-fields">
                            <div className="income-field">
                                <label htmlFor="ugiDiaria">UGI Diaria</label>
                                <select id="ugiDiaria" onChange={handleChange} value={formData.ugiDiaria}>
                                    <option value="" disabled selected hidden>Seleccione UGI diaria</option>
                                    {/* opciones de UGI Diaria */}
                                </select>
                            </div>
                            <div className="income-field">
                                <label htmlFor="trabajador">Trabajador</label>
                                <select id="trabajador" onChange={handleChange} value={formData.trabajador}>
                                    <option value="" disabled selected hidden>Seleccione trabajador</option>
                                    {/* opciones de Trabajador */}
                                </select>
                            </div>
                            <div className="income-field">
                                <label htmlFor="tipoIngreso">Tipo de Ingreso</label>
                                <select id="tipoIngreso" onChange={handleChange} value={formData.tipoIngreso}>
                                    <option value="" disabled selected hidden>Seleccione tipo de ingreso</option>
                                    {/* opciones de Tipo de Ingreso */}
                                </select>
                            </div>
                            <div className="income-field">
                                <label htmlFor="valor">Valor</label>
                                <input type="text" id="valor" placeholder="Ingrese el valor" onChange={handleChange} value={formData.valor} />
                                {errors.valor && <p className="error-message">{errors.valor}</p>}
                            </div>
                            <div className="income-field">
                                <label htmlFor="comentario">Comentario</label>
                                <input type="text" id="comentario" placeholder="Ingrese un comentario" onChange={handleChange} value={formData.comentario} />
                            </div>
                            <div className="income-field">
                                <label htmlFor="descripcion">Descripción</label>
                                <input type="text" id="descripcion" placeholder="Ingrese una descripción" onChange={handleChange} value={formData.descripcion} />
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
        </div>
    );
};

export default Income;
