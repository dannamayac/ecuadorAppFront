import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'

const CreatePartner = () => {
    const [pageTitle] = useState('Crear socio');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/partner-management"/>
            </div>
        </div>
      );
    }

export default CreatePartner;
