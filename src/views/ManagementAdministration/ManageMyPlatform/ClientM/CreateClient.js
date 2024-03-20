import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'

const CreateClient = () => {
    const [pageTitle] = useState('Crear cliente');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/client-management"/>
            </div>
        </div>
      );
    }

export default CreateClient;
