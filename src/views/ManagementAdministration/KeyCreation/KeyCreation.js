import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/KeyCreationStyles.css"

const KeyCreation = () => {
    const [pageTitle] = useState('Creación de llaves');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
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
                        <button className="history-button">Historico de aprobación
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
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
                            <input type="text" id="value" placeholder="0" />
                        </div>
                    </div>
                    <div className="income-buttonsK">
                        <button className="create-button create">Crear llave</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeyCreation;
