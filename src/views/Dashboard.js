import React from 'react';
import { useState } from 'react'
import Sidebar from '../components/SideBar';
import Header from '../components/Header';

const Dashboard = () => {
    const [pageTitle] = useState('Dashboard');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle}/>
                
            </div>
        </div>
      );
    }

export default Dashboard;
