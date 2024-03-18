import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import UnitsDisplay from '../views/UnitsDisplay'
import Dashboard from '../views/Dashboard'

function Navigation() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/units-display" element={<UnitsDisplay />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Agrega más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
