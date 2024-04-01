import React from 'react'
import { useState } from 'react'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import "../../styles/ManagementAdministration/ManagePlatformStyles.css"

const Approvals = () => {
    const [pageTitle] = useState('Aprobaciones');
    const navigate = useNavigate();

    const handleKeyApprovalsClick = () => {
        navigate('/key-approvals');
    }
    const handleExpensesApprovalsClick = () => {
        navigate('/expenses-approvals');
    }
    const handleSalesApprovalsClick = () => {
        navigate('sales-approvals');
    }
    const handleInsuranceApprovalsClick = () => {
        navigate('/insurance-approvals');
    }

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/" startItem="Inicio"/>
                <div className="bottom-buttons">
                        <div className="row">
                            <div className="col">
                                <button className="small-box" onClick={handleKeyApprovalsClick}>Aprobación llaves
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleExpensesApprovalsClick}>Aprobación pre-gastos
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleSalesApprovalsClick}>Aprobación pre-ventas
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                            <div className="col">
                                <button className="small-box" onClick={handleInsuranceApprovalsClick}>Aprobación seguros
                                    <div className="sub-button">Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;
