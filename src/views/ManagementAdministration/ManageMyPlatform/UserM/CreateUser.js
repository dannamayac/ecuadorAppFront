import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'

const CreateUser = () => {
    const [pageTitle] = useState('Crear usuario');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/user-management"/>
            </div>
        </div>
      );
    }

export default CreateUser;
