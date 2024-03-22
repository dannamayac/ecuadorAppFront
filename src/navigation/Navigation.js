import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UnitsDisplay from '../views/UnitsDisplay'
import Dashboard from '../views/Dashboard'
import ManagementAdministration from '../views/ManagementAdministration/ManagementAdministration';
import ManagePlatform from '../views/ManagementAdministration/ManageMyPlatform/ManagePlatform';
import UnitManagement from '../views/ManagementAdministration/ManageMyPlatform/UnitM/UnitManagement';
import UserManagement from '../views/ManagementAdministration/ManageMyPlatform/UserM/UserManagement';
import ClientManagement from '../views/ManagementAdministration/ManageMyPlatform/ClientM/ClientManagement';
import PartnerManagement from '../views/ManagementAdministration/ManageMyPlatform/PartnerM/PartnerManagement';
import CreateUnit from '../views/ManagementAdministration/ManageMyPlatform/UnitM/CreateUnit';
import CreateUser from '../views/ManagementAdministration/ManageMyPlatform/UserM/CreateUser';
import EditUser from '../views/ManagementAdministration/ManageMyPlatform/UserM/EditUser';
import CreatePartner from '../views/ManagementAdministration/ManageMyPlatform/PartnerM/CreatePartner';
import EditPartner from '../views/ManagementAdministration/ManageMyPlatform/PartnerM/EditPartner';
import EditClient from '../views/ManagementAdministration/ManageMyPlatform/ClientM/EditClient';
import CreateClient from '../views/ManagementAdministration/ManageMyPlatform/ClientM/CreateClient';
import InactiveClients from '../views/ManagementAdministration/ManageMyPlatform/ClientM/InactiveClients';
import PortfolioRequest from '../views/ManagementAdministration/ManageMyPlatform/ClientM/PortfolioRequest';


function Navigation() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/units-display" element={<UnitsDisplay />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Gestión y administración */}
          <Route path="/management-administration" element={<ManagementAdministration />} />
          <Route path="/manage-platform" element={<ManagePlatform />} />
          {/* Gestión unidades */}
          <Route path="/unit-management" element={<UnitManagement />} />
          <Route path="/create-unit" element={<CreateUnit />} />
          {/* Gestión usuarios */}
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/edit-user" element={<EditUser />} />
          {/* Gestión clientes */}
          <Route path="/client-management" element={<ClientManagement />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/edit-client" element={<EditClient />} />
          <Route path="/inactive-clients" element={<InactiveClients />} />
          <Route path="/portfolio-request" element={<PortfolioRequest />} />
          {/* Gestión socios */}
          <Route path="/partner-management" element={<PartnerManagement />}/>
          <Route path="/create-partner" element={<CreatePartner />} />
          <Route path="/edit-partner" element={<EditPartner />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
