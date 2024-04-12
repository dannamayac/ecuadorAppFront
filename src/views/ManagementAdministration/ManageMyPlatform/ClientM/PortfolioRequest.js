import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const PortfolioRequest = () => {
    const [pageTitle] = useState('Solicitud de castigo de cartera');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [isActiveAll, setIsActiveAll] = useState(false);
    const [userStates, setUserStates] = useState([
        { id: 1, isActive: false },
        { id: 2, isActive: false },
    ]);

    // Función para cambiar el estado de isActiveAll y de todos los switches de la tabla
    const toggleAllSwitches = () => {
        const newState = !isActiveAll;
        setIsActiveAll(newState);
        setUserStates(userStates.map(user => ({ ...user, isActive: newState })));
    };

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
                <Header title={pageTitle} backButtonPath="/client-management" startItem="Clientes" />
                <button className="create-button" >Inactivar todos &nbsp;&nbsp;
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
                            <th>Tiempo plataforma</th>
                            <th>Última fecha de pago</th>
                            <th>Saldo</th>
                            <th>Días mora</th>
                            <th>Contrato SI/NO</th>
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
                                <td>10000000</td>
                                <td>1 año</td>
                                <td>30/01/2024</td>
                                <td>5000000</td>
                                <td>60</td>
                                <td>SI</td>
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

export default PortfolioRequest;