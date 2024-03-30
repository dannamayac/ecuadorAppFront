import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../../components/SideBar';
import SecondHeader from '../../../../components/SecondHeader';
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css";

const UnitManagement = () => {
    const [pageTitle] = useState('Gestión de unidades');
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('http://192.168.240.103:8000/api/GestionUnidades/listData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const unitsData = data["Gestion de Unidades"];
                setUnits(unitsData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchUnits();
    }, []); 

    const handleCreateUnitClick = () => {
        navigate('/create-unit');
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <SideBar />
            </div>
            <div className="right-h">
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Unidades" showSearch={true}/>
                 {/* Botón "Crear nueva unidad" */}
                <button className="create-button" onClick={handleCreateUnitClick}>Crear nueva unidad</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Unidad</th>
                            <th>Codigo</th>
                            <th>Ubicacion</th>
                            <th>Estado</th>
                            <th>Asignar Administrador</th>
                            <th>Mora Establecida</th>
                            <th>Socio</th>
                            <th>Porcentajes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(units) && units.map(unit => (
                            <tr key={unit.id}>
                                <td>{unit.unit}</td>
                                <td>{unit.code}</td>
                                <td>{unit.location}</td>
                                <td>{unit.id_state}</td>
                                <td>{unit.id_user_management}</td>
                                <td>{unit.established_default}</td>
                                <td>{unit.id_partner_management}</td>
                                <td>{unit.percentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UnitManagement;
