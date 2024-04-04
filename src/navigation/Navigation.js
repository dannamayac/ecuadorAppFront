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
import Income from '../views/ManagementAdministration/Income/Income';
import Expenses from '../views/ManagementAdministration/Expenses/Expenses.js'
import Sales from '../views/ManagementAdministration/Sales/Sales';
import CashManagement from '../views/ManagementAdministration/CashManagement/CashManagement.js';
import BoxSummary from '../views/ManagementAdministration/CashManagement/BoxSummary.js';
import KeyCreation from '../views/ManagementAdministration/KeyCreation/KeyCreation.js';
import KeyCreationHistory from '../views/ManagementAdministration/KeyCreation/KeyCreationHistory.js';
import OpeningOfBoxes from '../views/ManagementAdministration/OpeningOfBoxes/OpeningOfBoxes.js';
import OpeningOfBoxesHistory from '../views/ManagementAdministration/OpeningOfBoxes/OpeningOfBoxesHistory.js';
import CleaningPayment from '../views/ManagementAdministration/CleaningPayment/CleaningPayment';
import ExpenseHistory from '../views/ManagementAdministration/Expenses/ExpenseHistory.js';
import IncomeHistory from '../views/ManagementAdministration/Income/IncomeHistory.js';
import ReportsAndMetrics from '../views/ManagementAdministration/ManageMyPlatform/ReportsAndMetrics.js';
import Billing from '../views/Billing/Billing.js';
import Approvals from '../views/Approvals/Approvals.js';
import KeyApprovals from '../views/Approvals/KeyApprovals/KeyApprovals.js';
import ExpensesApprovals from '../views/Approvals/ExpensesApprovals/ExpensesApprovals.js';
import SalesApprovals from '../views/Approvals/SalesApprovals/SalesApprovals.js';
import InsuranceApprovals from '../views/Approvals/InsuranceApprovals/InsuranceApprovals.js';
import UserType from '../views/ManagementAdministration/ManageMyPlatform/UserM/UserType.js';

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
            {/* Administrar mi plataforma */}
            <Route path="/manage-platform" element={<ManagePlatform />} />
              {/* Gestión unidades */}
              <Route path="/unit-management" element={<UnitManagement />} />
              <Route path="/create-unit" element={<CreateUnit />} />
              {/* Gestión usuarios */}
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/user-type" element={<UserType />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
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
              {/* Reportes y métricas */}
              <Route path="/reports-metrics" element={<ReportsAndMetrics />}/>
            {/* Ingresos */}
            <Route path="/income" element={<Income />} />
            <Route path="/income-history" element={<IncomeHistory />} />
            {/* Gastos */}
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expense-history" element={<ExpenseHistory />} />
            {/* Ventas */}
            <Route path="/sales" element={<Sales />} />
            {/* Gestión de cajas */}
            <Route path="/cash-management" element={<CashManagement />} />
            <Route path="/box-summary" element={<BoxSummary />} />
            {/* Creación de llaves */}
            <Route path="/key-creation" element={<KeyCreation />} />
            <Route path="/key-creation-history" element={<KeyCreationHistory />} />
            {/* Apertura masiva de cajas */}
            <Route path="/opening-of-boxes" element={<OpeningOfBoxes />} />
            <Route path="/opening-of-boxes-history" element={<OpeningOfBoxesHistory />} />
            {/* Limpieza de cobro */}
            <Route path="/cleaning-payment" element={<CleaningPayment />} />
          {/* Facturación */}
          <Route path="/billing" element={<Billing />} />
          {/* Aprobaciones */}
          <Route path="/approvals" element={<Approvals />} />
            {/* Aprobación de llaves */}
            <Route path="/key-approvals" element={<KeyApprovals />} /> 
            {/* Aprobaciones pre-gastos */}
            <Route path="/expenses-approvals" element={<ExpensesApprovals />} />
            {/* Aprobaciones  pre-ventas*/}
            <Route path="/sales-approvals" element={<SalesApprovals />} />
            {/* Aprobaciones */}
            <Route path="/insurance-approvals" element={<InsuranceApprovals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
