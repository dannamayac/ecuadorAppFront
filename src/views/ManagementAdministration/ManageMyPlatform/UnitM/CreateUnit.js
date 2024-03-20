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
                <Header title= {pageTitle} backButtonPath="/unit-management" />
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="nombreUnidad">Nombre unidad</label>
                        <input type="text" id="nombreUnidad" placeholder="Ingrese el nombre de la unidad" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" id="codigo" placeholder="Ingrese el código" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ubicacion">Ubicación</label>
                        <input type="text" id="ubicacion" placeholder="Ingrese la ubicación" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <input type="text" id="estado" placeholder="Ingrese el estado" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin">Asignar administrador</label>
                        <input type="text" id="admin" placeholder="Ingrese el administrador" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mora">Mora establecida</label>
                        <input type="text" id="mora" placeholder="Ingrese la mora establecida" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="socio">Socio</label>
                        <input type="text" id="socio" placeholder="Ingrese el socio" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accionario">%</label>
                        <input type="text" id="accionario" placeholder="Ingrese el %" />
                    </div>
                </div>
                <button className="create-button cancel">Cancelar</button>
                <button className="create-button create">Crear nueva unidad</button>
            </div>
        </div>
    );
}

export default CreateUnit;
