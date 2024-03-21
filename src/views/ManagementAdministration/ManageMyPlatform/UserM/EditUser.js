import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const EditUser = () => {
    const [pageTitle] = useState('Editar usuario');
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
                <Header title={pageTitle} backButtonPath="/user-management" startItem="Gestión de usuarios"/>
                <div className="form-container">
                    {/* Agrega los campos restantes aquí */}
                    <div className="form-group">
                        <label htmlFor="userName">Nombre</label>
                        <input type="text" id="userName" placeholder="Ingrese el nombre" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userType">Tipo de usuario</label>
                        <input type="text" id="userType" placeholder="Ingrese el tipo de usuario" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userUnit">Unidad</label>
                        <input type="text" id="userUnit" placeholder="Ingrese la unidad" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userEmail">Correo</label>
                        <input type="text" id="userEmail" placeholder="Ingrese el correo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPhoneNumber">Número de celular</label>
                        <input type="text" id="userPhoneNumber" placeholder="Ingrese el número de celular" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignedUnit">Unidad asignada</label>
                        <input type="text" id="assignedUnit" placeholder="Ingrese la unidad asignada" />
                    </div>
                    <div className="form-group">
                        <span className="switch-label">Estado</span>
                        <label htmlFor="userActiveSwitch" className="switch">
                            <input type="checkbox" id="userActiveSwitch" checked={isActive} onChange={toggleActive} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <button className="create-button cancel">Eliminar usuario</button>
                <button className="create-button create">Guardar cambios</button>
            </div>
        </div>
    );
}

export default EditUser;
