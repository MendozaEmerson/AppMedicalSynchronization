import './App.css';
import { useState } from "react";
import Axios from "axios";

import MyNavbar from './components/Navbar';  // Importa el componente Navbar


import Login from './components/Login';
import DoctorRegister from './components/Doctor';
import PatientRegister from './components/Paciente';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  

  return (
    

    <div className="App">
    
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctor" element={<DoctorRegister />} />
        <Route path="/paciente" element={<PatientRegister />} />
      </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;
