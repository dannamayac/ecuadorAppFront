import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CreateUnit = () => {
    const [pageTitle] = useState('Crear nueva unidad');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title= {pageTitle} backButtonPath="/unit-management" startItem="Unidades"/>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="unitName">Nombre unidad</label>
                        <input type="text" id="unitName" placeholder="Ingrese el nombre de la unidad" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="code">Código</label>
                        <input type="text" id="code" placeholder="Ingrese el código" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ubication">Ubicación</label>
                        <input type="text" id="ubication" placeholder="Ingrese la ubicación" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">Estado</label>
                        <input type="text" id="state" placeholder="Ingrese el estado" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin">Asignar administrador</label>
                        <input type="text" id="admin" placeholder="Ingrese el administrador" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="arrears">Mora establecida</label>
                        <input type="text" id="arrears" placeholder="Ingrese la mora establecida" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="partner">Socio</label>
                        <input type="text" id="partner" placeholder="Ingrese el socio" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shareHolder">%</label>
                        <input type="text" id="shareHolder" placeholder="Ingrese el %" />
                    </div>
                </div>
                <button className="create-button cancel">Cancelar</button>
                <button className="create-button create">Crear nueva unidad</button>
            </div>
        </div>
    );
}

export default CreateUnit;
