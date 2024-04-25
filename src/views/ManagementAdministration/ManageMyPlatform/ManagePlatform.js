import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import ButtonWithAvatars from '../../../components/ButtonWithAvatars'
import MetricsButton from '../../../components/MetricsButton'
import { LineChartGreen, LineChartRed, LineChartYellow, LineChartAquamarine } from '../../../components/LineChart'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"
import avatar1 from '../../../assets/avatar1.png';
import avatar2 from '../../../assets/avatar2.png';
import avatar3 from '../../../assets/avatar3.png';
import avatar4 from '../../../assets/avatar4.png';
import avatar5 from '../../../assets/avatar5.png';
import avatar6 from '../../../assets/avatar6.png';

const ManagePlatform = () => {
    const [pageTitle] = useState('Administrar mi plaforma');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();

    const avatars = [avatar6, avatar2, avatar3, avatar4, avatar5, avatar1];

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

    const handleUnitManagementClick = () => {
        navigate('/unit-management');
    }
    const handleUserManagementClick = () => {
        navigate('/user-management');
    }
    const handleClientManagementClick = () => {
        navigate('/client-management');
    }
    const handlePartnerManagementClick = () => {
        navigate('/partner-management');
    }
    const handleReportsAndMetricsClick = () => {
        navigate('/reports-metrics');
    }

    const subSummaries = [
        { title: "Recaudo", value: "39,786 USD" },
        { title: "Ingresos", value: "52,439 USD" },
        { title: "Crecimiento", value: "7,123 USD" },
        { title: "Gastos", value: "23,456 USD" }
      ];

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
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="Administrar" />
                <div className="top-pl">
                    <div className="button-row">
                        <ButtonWithAvatars
                            title="Gestión Unidades"
                            avatars={avatars}
                            onClick={handleUnitManagementClick}
                        />
                    </div>
                    <div className="button-row">
                        <ButtonWithAvatars
                            title="Gestión Usuarios"
                            avatars={avatars}
                            onClick={handleUserManagementClick}
                        />
                    </div>
                    <div className="button-row">
                        <ButtonWithAvatars
                            title="Gestión Clientes"
                            avatars={avatars}
                            onClick={handleClientManagementClick}
                        />
                    </div>
                    <div className="button-row">
                        <ButtonWithAvatars
                            title="Gestión Socios"
                            avatars={avatars}
                            onClick={handlePartnerManagementClick}
                        />
                    </div>
                </div>
                <div className="bottom-pl">
                    {/* Contenido de la parte inferior */}
                    <div className="bottom-buttons">
                    <MetricsButton
                        title="Reportes y métricas"
                        mainChart={LineChartAquamarine}
                        subCharts={[LineChartGreen, LineChartRed, LineChartYellow, LineChartAquamarine]}
                        subSummaries={subSummaries}
                        onClick={handleReportsAndMetricsClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePlatform;
