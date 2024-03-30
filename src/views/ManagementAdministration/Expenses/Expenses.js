import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ExpensesStyles.css"

const Expenses = () => {
    const [pageTitle] = useState('Gastos');

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
                            <h1 className="header-title">Nuevo gasto</h1>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button">Historial de ingresos
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
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
                            <select id="ugiDiaria">
                                {/* opciones de UGI Diaria */}
                            </select>
                        </div>
                        <div className="income-field">
                            <label htmlFor="trabajador">Trabajador</label>
                            <select id="trabajador">
                                {/* opciones de Trabajador */}
                            </select>
                        </div>
                        <div className="income-field">
                            <label htmlFor="tipoIngreso">Tipo de egreso</label>
                            <select id="tipoIngreso">
                                {/* opciones de Tipo de Ingreso */}
                            </select>
                        </div>
                        <div className="income-field">
                            <label htmlFor="valor">Valor</label>
                            <input type="text" id="valor" placeholder="Ingrese el valor"/>
                        </div>
                        <div className="income-field">
                            <label htmlFor="comentario">Comentario</label>
                            <input type="text" id="comentario" placeholder="Ingrese un comentario"/>
                        </div>
                        <div className="income-field">
                            <label htmlFor="descripcion">Descripción</label>
                            <input type="text" id="descripcion" placeholder="Ingrese una descripción"/>
                        </div>
                    </div>
                    <div className="income-buttons-container">
                        <div className="attach-files">
                            <button className="attach-button">
                                <FontAwesomeIcon icon={faUpload} /> Adjuntar archivos<span>+</span>
                            </button>
                        </div>
                        <div className="income-buttons">
                            <button className="create-button create">Guardar gasto</button>
                            <button className="create-button cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expenses;
