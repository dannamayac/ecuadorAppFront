import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"


const UnitManagement = () => {
    const [pageTitle] = useState('Gestión de unidades');
    const navigate = useNavigate();
    const [units] = useState([
        { id: 1, name: 'Unidad 1', location: 'Ubicación 1', status: 'Disponible', previousBox: '$100', finalBox: '$200', payments: 'Pagos', incomes: '$500', totalExpenses: '$300', lastMovement: '2024-03-15', device: 'Dispositivo 1' },
        { id: 2, name: 'Unidad 2', location: 'Ubicación 2', status: 'Ocupado', previousBox: '$150', finalBox: '$250', payments: 'No pagos', incomes: '$600', totalExpenses: '$400', lastMovement: '2024-03-16', device: 'Dispositivo 2' },
        // Agrega más unidades si es necesario
    ]);

    const handleCreateUnitClick = () => {
        navigate('/create-unit');
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <SideBar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/manage-platform" />
                 {/* Botón "Crear nueva unidad" */}
                <button className="create-button" onClick={handleCreateUnitClick}>Crear nueva unidad</button>
                {/* Tabla de gestión de unidades */}
                <table>
                    <thead>
                        <tr>
                            <th>Unidad</th>
                            <th>Ubicación</th>
                            <th>Estado</th>
                            <th>Caja anterior</th>
                            <th>Caja final</th>
                            <th>Pagos/No pagos</th>
                            <th>Ingresos</th>
                            <th>Total egresos</th>
                            <th>Último movimiento</th>
                            <th>Dispositivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(unit => (
                            <tr key={unit.id}>
                                <td>{unit.name}</td>
                                <td>{unit.location}</td>
                                <td>{unit.status}</td>
                                <td>{unit.previousBox}</td>
                                <td>{unit.finalBox}</td>
                                <td>{unit.payments}</td>
                                <td>{unit.incomes}</td>
                                <td>{unit.totalExpenses}</td>
                                <td>{unit.lastMovement}</td>
                                <td>{unit.device}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UnitManagement;
