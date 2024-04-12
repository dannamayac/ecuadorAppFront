import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader';
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css";

const UnitManagement = () => {
    const [pageTitle] = useState('Gestión de unidades');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.sidebar') && isMenuVisible) {
            setIsMenuVisible(false);
            if (window.innerWidth > 768) {
              setSidebarExpanded(false);
            }
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isMenuVisible]);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UNITS_LIST_ENDPOINT}`);
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
            <FontAwesomeIcon 
                icon={faBars} 
                className="menu-icon" 
                onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
            <Sidebar
                isMenuVisible={isMenuVisible}
                setIsMenuVisible={setIsMenuVisible}
                setParentSidebarExpanded={setSidebarExpanded}
            />
            <div className={`right-h ${sidebarExpanded ? '' : 'contracted'}`}>
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Unidades" showSearch={true}/>
                <button className="create-button" onClick={handleCreateUnitClick}>
                    <div className="left-bu">Crear nueva unidad </div>
                    <div className="right-bu">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Unidad</th>
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
                                <td>
                                    {unit.id_state === 1 && <span className="green-circle" />}
                                    {unit.id_state === 2 && <span className="yellow-circle" />}
                                    {unit.id_state === 3 && <span className="red-circle" />}
                                </td>
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
