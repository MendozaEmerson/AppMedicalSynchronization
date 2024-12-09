import './App.css';
import { useState } from "react";
import Axios from "axios";

import MyNavbar from './components/Navbar';  // Importa el componente Navbar


import Login from './components/Login';



function App() {
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState(0);


  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      paterno:paterno,
      materno:materno,
      dni:dni,
      edad:edad
    }
    ).then(()=>{
      alert("Empleado Registrado");
    })
  }

  return (
    

    <div className="App">
    <MyNavbar /> {/* Aquí se incluye el componente Navbar */}
      <div className="datos">
        <label>Nombre: <input
          onChange={(event) => {
            setNombre(event.target.value);
          }}
          type="text" /></label>
        <label>Apellido Paterno: <input
          onChange={(event) => {
            setPaterno(event.target.value);
          }}
          type="text" /></label>
        <label>Apellido Materno: <input
          onChange={(event) => {
            setMaterno(event.target.value);
          }}
          type="text" /></label>
        <label>DNI: <input
          onChange={(event) => {
            setDni(event.target.value);
          }}
          type="number" /></label>
        <label>Edad: <input
          onChange={(event) => {
            setEdad(event.target.value);
          }}
          type="number" /></label>

        <button onClick={add}>Registrar</button>
      </div>
    </div>

    
  );
}

export default App;
