import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateClient = () => {
    const [pageTitle] = useState('Crear cliente');
    const [isActive, setIsActive] = useState(false);

    // Función para cambiar el estado de isActive
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Gestión de clientes"/>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="clientUnit">Unidad</label>
                        <input type="text" id="clientUnit" placeholder="Ingrese el nombre de la unidad" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientName">Nombre completo</label>
                        <input type="text" id="clientName" placeholder="Ingrese el nombre completo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickname">Apodo</label>
                        <input type="text" id="nickname" placeholder="Ingrese el apodo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="documentType">Tipo de documento</label>
                        <input type="text" id="documentType" placeholder="Ingrese el tipo de documento" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idNumber">Número de documento</label>
                        <input type="text" id="idNumber" placeholder="Ingrese el número de documento" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" placeholder="Ingrese la dirección" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Teléfono</label>
                        <input type="text" id="telephone" placeholder="Ingrese el número de teléfono" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" placeholder="Ingrese la ciudad" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="e-mail">Correo electrónico</label>
                        <input type="text" id="e-mail" placeholder="Ingrese el correo electrónico" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Fecha de nacimiento</label>
                        <input type="text" id="birthdate" placeholder="Ingrese la fecha de nacimiento" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="neighborhood">Barrio</label>
                        <input type="text" id="neighborhood" placeholder="Ingrese el barrio" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cellphone">Celular</label>
                        <input type="text" id="cellphone" placeholder="Ingrese el número de celular" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="economicActivity">Actividad económica</label>
                        <input type="text" id="economicActivity" placeholder="Ingrese la actividad económica" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" placeholder="Ingrese la dirección" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Teléfono</label>
                        <input type="text" id="telephone" placeholder="Ingrese el número de teléfono" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reference">Info de usuario de referencia</label>
                        <input type="text" id="reference" placeholder="Ingrese el usuario de referencia" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentFrequency">Frecuencia de pago</label>
                        <input type="text" id="paymentFrequency" placeholder="Ingrese la frecuencia de pago" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentTerms">Plazos de pago</label>
                        <input type="text" id="paymentTerms" placeholder="Ingrese los plazos de pago" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="establishedArrears">Mora establecida</label>
                        <input type="text" id="establishedArrears" placeholder="Ingrese el usuario de referencia" />
                    </div>
                    <div className="form-group center">
                    <span className="switch-label">Estado</span>
                        <label htmlFor="activeSwitch" className="switch">
                            <input type="checkbox" id="activeSwitch" checked={isActive} onChange={toggleActive} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <button className="create-button cancel">Cancelar</button>
                <button className="create-button create">Crear nuevo cliente</button>
            </div>
        </div>
    );
}

export default CreateClient;
