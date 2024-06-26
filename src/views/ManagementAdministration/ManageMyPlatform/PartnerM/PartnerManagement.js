import React,  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const PartnerManagement = () => {
    const [pageTitle] = useState('Gestión de socios');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const navigate = useNavigate();
    const [partners,setPartner] = useState([]);

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
        const fetchPartners = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PARTNERS_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const partnersData = data.Socios;
    
                const partnersWithState = partnersData.map(partner => {
                    const isActive = partner.state === 1;
                    return {
                        ...partner,
                        isActive: isActive
                    };
                });
    
                setPartner(partnersWithState);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchPartners();
    }, []);
    

    const handleCreatePartner = () => {
        navigate('/create-partner');
    };
    const handleEditPartner = (partnerId) => {
        navigate(`/edit-partner/${partnerId}`);
    };
    const toggleUserSwitch = (partnerId) => {
        setPartner(prevPartners =>
            prevPartners.map(partner =>
                partner.id === partnerId ? { ...partner, state: partner.state === 1 ? 0 : 1 } : partner
            )
        );
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
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Socios" showSearch={true}/>
                <button className="create-button" onClick={handleCreatePartner}>
                    <div className="left-bu">Crear nuevo socio </div>
                    <div className="right-bu">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Unidad</th>
                            <th>% Accionario</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(partners) && partners.map(partner => {
                            return (
                                <tr key={partner.id}>
                                    <td>{partner.partnert_name}</td>
                                    <td>{partner.unit_name}</td>
                                    <td>{partner.share_percentage}</td>
                                    <td>{partner.email}</td>
                                    <td>
                                        <label htmlFor={`userActiveSwitch_${partner.id}`} className="switch2">
                                            <input
                                                type="checkbox"
                                                id={`userActiveSwitch_${partner.id}`}
                                                checked={partner.isActive}
                                                onChange={() => toggleUserSwitch(partner.id)}
                                            />
                                            <span className="slider2 round2"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button className='edit-button' onClick={() =>handleEditPartner(partner.id)}>Editar</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PartnerManagement;
