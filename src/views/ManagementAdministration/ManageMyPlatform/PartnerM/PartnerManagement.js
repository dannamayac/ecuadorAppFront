import React,  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../../components/SideBar'
import SecondHeader from '../../../../components/SecondHeader'
import "../../../../styles/ManagementAdministration/UnitManagementStyles.css"

const PartnerManagement = () => {
    const [pageTitle] = useState('Gestión de socios');
    const navigate = useNavigate();
    const [partners,setPartner] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch('http://192.168.0.9:8000/api/GestionSocios/listData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const partnersData = data["Gestion de Unidades"];
                setPartner(partnersData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchPartners();
    }, []); 

    const handleCreatePartner = () => {
        navigate('/create-partner');
    };
    const handleEditPartner = () => {
        navigate('/edit-partner');
    };

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <SecondHeader title={pageTitle} backButtonPath="/manage-platform" startItem="Socios" showSearch={true}/>
                <button className="create-button" onClick={handleCreatePartner}>Crear nuevo usuario</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Unidad</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(partners) && partners.map(partner => (
                        <tr key={partner.id}>
                            <td>{partner.partnert_name}</td>
                            <td>{partner.unit_name}</td>
                            <td>{partner.stock}</td>
                            <td>{partner.email}</td>
                            <td>{partner.state}</td>
                            <td>
                                <button onClick={handleEditPartner}>Editar</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PartnerManagement;
