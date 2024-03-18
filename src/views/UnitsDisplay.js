import React from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';

const UnitsDisplay = () => {
    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header/>
            </div>
        </div>
      );
    }

export default UnitsDisplay;
