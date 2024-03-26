import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/IncomeStyles.css"

const Income = () => {
    const [pageTitle] = useState('Ingresos');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General"/>
                <div className="income-header">
                    <button className="history-button">Historial de ingresos</button>
                </div>
                <div className="income-form">
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
                            <label htmlFor="tipoIngreso">Tipo de Ingreso</label>
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
                        <div className="income-buttons">
                            <button className="create-button create">Guardar Ingreso</button>
                            <button className="create-button cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Income;
