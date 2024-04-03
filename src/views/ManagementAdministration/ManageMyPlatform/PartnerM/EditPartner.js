import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const EditPartner = () => {
    const [pageTitle] = useState('Editar socio');
    const [isActive, setIsActive] = useState(false);

    // Función para cambiar el estado de isActive
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/partner-management" startItem="Gestión de socios" />
                <div className="form-container">
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="partnerName">Nombre</label>
                            <input type="text" id="partnerName" placeholder="Ingrese el nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="partnerEmail">Correo</label>
                            <input type="text" id="partnerEmail" placeholder="Ingrese el correo" />
                        </div>
                    </div>
                    <div className="income-header">
                        <div className="form-group">
                            <label htmlFor="assignedUnit">Unidad asignada</label>
                            <input type="text" id="assignedUnit" placeholder="Ingrese la unidad asignada" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="percentageOwnership">Porcentaje accionario</label>
                            <input type="text" id="percentageOwnership" placeholder="Ingrese el porcentaje accionario" />
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
                        <button type="button" className="create-button2 cancel" >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPartner;
