import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const InactiveClients = () => {
    const [pageTitle] = useState('Historial de clientes inactivos');
    const [isActiveAll, setIsActiveAll] = useState(false);
    const [userStates, setUserStates] = useState([
        { id: 1, isActive: false },
        { id: 2, isActive: false }
    ]);

    // Función para cambiar el estado de isActiveAll y de todos los switches de la tabla
    const toggleAllSwitches = () => {
        const newState = !isActiveAll;
        setIsActiveAll(newState);
        setUserStates(userStates.map(user => ({ ...user, isActive: newState })));
    };

    // Función para cambiar el estado de un switch individual en la tabla
    const toggleUserSwitch = (userId) => {
        setUserStates(userStates.map(user => {
            if (user.id === userId) {
                return { ...user, isActive: !user.isActive };
            }
            return user;
        }));
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Clientes" />
                <button className="create-button" >Activar todos &nbsp;&nbsp;
                    <label htmlFor="userActiveSwitch" className="switch2">
                        <input type="checkbox" id="userActiveSwitch" checked={isActiveAll} onChange={toggleAllSwitches} />
                        <span className="slider2 round2"></span>
                    </label>
                </button>
                {/* Tabla para listar usuarios */}
                <table>
                    <thead>
                        <tr>
                            <th>ID Cliente Alias</th>
                            <th>Unidad Solicitante</th>
                            <th>Total Venta</th>
                            <th>Fecha Inactivación</th>
                            <th>Última fecha de pago</th>
                            <th>Contrato SI/NO</th>
                            <th>Usuario Inactivo</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map sobre los datos de los usuarios para renderizar filas */}
                        {userStates.map(user => (
                            <tr key={user.id}>
                                <td>123</td>
                                <td>Unidad</td>
                                <td>10.000.000</td>
                                <td>30/03/2024</td>
                                <td>28/02/2024</td>
                                <td>Si</td>
                                <td>Daniel</td>
                                <td>Descripción</td>
                                <td>
                                    <label htmlFor={`userActiveSwitch-${user.id}`} className="switch2">
                                        <input
                                            type="checkbox"
                                            id={`userActiveSwitch-${user.id}`}
                                            checked={user.isActive}
                                            onChange={() => toggleUserSwitch(user.id)}
                                        />
                                        <span className="slider2 round2"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InactiveClients;