import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/Approvals/ApprovalsStyle.css"

const ExpensesApprovals = () => {
    const [pageTitle] = useState('Aprobaciones');
    const [searchActive, setSearchActive] = useState(false);
    const [user, setUser] = useState({ id: 1, isActive: false });
    const navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

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
    

    const toggleUserSwitch = (userId, action) => {
        if (action === 'check') {
            setUser(prevUser => ({ ...prevUser, isActive: true }));
        } else if (action === 'times') {
            setUser(prevUser => ({ ...prevUser, isActive: false }));
        }
    };

    const handleExpenseHistoryClick = () => {
        navigate('/expenses-approvals-history');
    }

    const handleSearchToggle = () => {
        setSearchActive(!searchActive);
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
                <Header title={pageTitle} backButtonPath="/approvals" startItem="General" />
                <div className="income-header">
                    <div className="left-title">
                        <div className="title-container">
                            <h1 className="header-title">Aprobación pre-gastos</h1>
                        </div>
                    </div>
                    <div className="right-history">
                        <button className="history-button" onClick={handleExpenseHistoryClick} style={{ marginTop: '-10px' }}>
                            <span className="history-button-text">Histórico de aprobación pre-gastos</span>
                            <div className="sub-button">Ver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</div>
                        </button>
                    </div>
                </div>
                <div className="income-form">
                    <div className='filters' style={{ marginLeft: '15px', marginTop: '30px', width:'80%' }}>
                        <div className='search'>
                            <div className="search-container">
                                <div className="search-wrapper">
                                    <input className="search-input2" type="text" placeholder="Escriba aquí para buscar" />
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchToggle} />
                                </div>
                            </div>
                        </div>
                        <div className="filter-field" style={{ marginLeft:'-20px'}}>
                            <select id="filterByIdOrField" className="filter-select">
                                <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                <option value="id">ID</option>
                                <option value="field">Campo</option>
                            </select>
                        </div>
                        <div className="filter-field">
                            <select id="filterByUnit" className="filter-select" >
                                <option value="" disabled selected hidden>Todas las unidades:</option>
                                {/* Opciones para filtrar por unidad */}
                            </select>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Unidad</th>
                            <th>ID pre-gasto</th>
                            <th>Descripción</th>
                            <th>Número documento</th>
                            <th>Fecha creación</th>
                            <th>Cantidad</th>
                            <th>Comentario</th>
                            <th>Estado</th>
                            <th>Fotos</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3923/Unidad</td>
                            <td>6432</td>
                            <td>Descripción</td>
                            <td>12345678</td>
                            <td>01/23/24</td>
                            <td>5.000.000</td>
                            <td>Comentario</td>
                            <td>Estado</td>
                            <td>Foto</td>
                            <td>
                                <button
                                    className={`checkbox-button ${user.isActive ? 'active-check' : ''}`}
                                    onClick={() => toggleUserSwitch(user.id, 'check')}
                                >
                                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                </button>
                                <button
                                    className={`checkbox-button ${!user.isActive ? 'active-times' : ''}`}
                                    onClick={() => toggleUserSwitch(user.id, 'times')}
                                >
                                    <FontAwesomeIcon icon={faTimes} className="times-icon" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpensesApprovals;