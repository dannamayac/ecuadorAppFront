import React from 'react';
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/CreateUnitStyles.css"

const CleaningPayment = () => {
    const [pageTitle] = useState('Limpieza de cobro');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/management-administration" startItem="General"/>
                
            </div>
        </div>
      );
    }

export default CleaningPayment;
