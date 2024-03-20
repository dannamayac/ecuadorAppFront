import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../../components/SideBar'
import Header from '../../../../components/Header'

const EditUser = () => {
    const [pageTitle] = useState('Editar usuario');

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

export default EditUser;
