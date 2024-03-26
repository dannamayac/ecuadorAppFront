import React from 'react'
import { useState } from 'react'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import "../../styles/ManagementAdministration/ManagePlatformStyles.css"

const ManagementAdministration = () => {
    const [pageTitle] = useState('Gestión y administración');
    const navigate = useNavigate();

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
    const handleCashManagementClick = () => {
        navigate('/cash-management');
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
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/" startItem="Inicio"/>
                <div className="top">
                    <div className="button-container">
                        <button className="adminPlat-button admin-platform" onClick={handleClick}>
                            <div className="left-bu">
                                Administrar mi plataforma
                                <div className="admin-button">Administrar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                            </div>
                            <div className="right-bu">
                                <FontAwesomeIcon icon={faHouse} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="bottom">
                    <div className="top-buttons">
                        <div className="row">
                            <div className="col">
                                <button className="small-box" onClick={handleIncomeClick}>Ingresos
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleExpensesClick}>Gastos
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleSalesClick}>Ventas
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleCashManagementClick}>Gestión de caja
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-buttons">
                        <div className="row">
                            <div className="col">
                                <button className="small-box" onClick={handleKeyCreationClick}>Creación de llaves
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleOpeningOfBoxesClick}>Apertura masiva cajas
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleCleaningPaymentClick}>Limpieza de cobro
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagementAdministration;
