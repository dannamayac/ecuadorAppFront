import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import ManagementButton from '../../components/ManagementButton'
import { useNavigate } from 'react-router-dom'
import "../../styles/Approvals/ApprovalsStyle.css"

const Approvals = () => {
    const [pageTitle] = useState('Aprobaciones');
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

    const handleKeyApprovalsClick = () => {
        navigate('/key-approvals');
    }
    const handleExpensesApprovalsClick = () => {
        navigate('/expenses-approvals');
    }
    const handleSalesApprovalsClick = () => {
        navigate('/sales-approvals');
    }
    const handleInsuranceApprovalsClick = () => {
        navigate('/insurance-approvals');
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
                <div className="bottom-buttons approvals-container"> {/* Usamos la nueva clase aquí */}
                    <div className="approval-button" onClick={handleKeyApprovalsClick}>
                            <ManagementButton
                                className="approval-button"
                                title="Aprobación de llaves"
                                onClick={handleKeyApprovalsClick}
                                fullWidthButton={true}
                            />
                        </div>
                        <div className="approval-button" onClick={handleExpensesApprovalsClick}>
                            <ManagementButton
                                className="approval-button"
                                title="Aprobación pre-gastos"
                                onClick={handleExpensesApprovalsClick}
                                fullWidthButton={true}
                            />
                        </div>
                        <div className="approval-button" onClick={handleSalesApprovalsClick}>
                            <ManagementButton
                                className="approval-button"
                                title="Aprobación pre-ventas"
                                onClick={handleSalesApprovalsClick}
                                fullWidthButton={true}
                            />
                        </div>
                        <div className="approval-button" onClick={handleInsuranceApprovalsClick}>
                            <ManagementButton
                                className="approval-button"
                                title="Aprobación seguros"
                                onClick={handleInsuranceApprovalsClick}
                                fullWidthButton={true}
                            />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;