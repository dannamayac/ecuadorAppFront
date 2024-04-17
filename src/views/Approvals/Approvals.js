import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../components/SideBar'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import "../../styles/ManagementAdministration/ManagePlatformStyles.css"

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
