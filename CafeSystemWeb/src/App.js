import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Home } from './features/view/home';
import { Cafe } from './features/view/cafe';
import { CafeDetails } from './features/view/cafeDetails';
import { Employees } from './features/view/employees';
import { EmployeeDetails } from './features/view/employeeDetails';
import { Header } from './components/header';

function App() {
  const history = createBrowserHistory();
  return (
    <div>

      <Router basename={'/'} history={history}>
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/Cafe" element={<Cafe />} />
          <Route path="/Cafe/CafeDetails" element={<CafeDetails />} />
          <Route path="/Cafe/CafeDetails/:id" element={<CafeDetails />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Employees/:cafe" element={<Employees />} />
          <Route path="/Employees/EmployeeDetails" element={<EmployeeDetails />} />
          <Route path="/Employees/EmployeeDetails/:id" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
