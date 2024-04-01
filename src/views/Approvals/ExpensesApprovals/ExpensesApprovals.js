import React from 'react'
import { useState } from 'react'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/IncomeStyles.css"

const ExpensesApprovals = () => {
    const [pageTitle] = useState('Aprobación pre-gastos');

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/approvals" startItem="General"/>
                
            </div>
        </div>
      );
    }

export default ExpensesApprovals;