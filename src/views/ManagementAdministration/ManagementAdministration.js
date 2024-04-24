import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import ManagementButton from '../../components/ManagementButton'
import { LineChartGreen, LineChartRed, LineChartYellow, LineChartAquamarine } from '../../components/LineChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import "../../styles/ManagementAdministration/ManagePlatformStyles.css"

const ManagementAdministration = () => {
    const [pageTitle] = useState('Gestión y administración');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();

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


    const handleClick = () => {
        navigate('/manage-platform');
    }
    const handleIncomeClick = () => {
        navigate('/income');
    }
    const handleExpensesClick = () => {
        navigate('/expenses');
    }
    const handleSalesClick = () => {
        navigate('/sales');
    }
    const handleBoxManagementClick = () => {
        navigate('/box-management');
    }
    const handleKeyCreationClick = () => {
        navigate('/key-creation');
    }
    const handleOpeningOfBoxesClick = () => {
        navigate('/opening-of-boxes');
    }
    const handleCleaningPaymentClick = () => {
        navigate('/cleaning-payment');
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
                <Header title={pageTitle} backButtonPath="/home" startItem="Inicio" />
                <div className="container">
                    <div className="top">
                        <div className="button-container">
                            <button className="adminPlat-button admin-platform" onClick={handleClick}>
                                <div className="left-bu">
                                    Administrar mi plataforma
                                    <div className="admin-button">Administrar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </div>
                                <div className="right-bu">
                                    <div className='iconHome-container'>
                                        <FontAwesomeIcon className="iconHome" icon={faHouse} />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="top-buttons">
                            <div className="row">
                                <div className="col">
                                    <ManagementButton
                                        title="Ingresos"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartAquamarine}
                                        onClick={handleIncomeClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                                <div className="col">
                                    <ManagementButton
                                        title="Gastos"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartYellow}
                                        onClick={handleExpensesClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                                <div className="col">
                                    <ManagementButton
                                        title="Ventas"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartGreen}
                                        onClick={handleSalesClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                                <div className="col">
                                    <ManagementButton
                                        title="Gestión de caja"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartRed}
                                        onClick={handleBoxManagementClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom-buttons">
                            <div className="row">
                                <div className="col">
                                    <ManagementButton
                                        title="Creación de llaves"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartGreen}
                                        onClick={handleKeyCreationClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                                <div className="col">
                                    <ManagementButton
                                        title="Apertura masiva cajas"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartRed}
                                        onClick={handleOpeningOfBoxesClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                                <div className="col">
                                    <ManagementButton
                                        title="Limpieza de cobro"
                                        summary="39,786 USD" // Esto será dinámico más adelante
                                        ChartComponent={LineChartAquamarine}
                                        onClick={handleCleaningPaymentClick}
                                        fullWidthButton={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementAdministration;
