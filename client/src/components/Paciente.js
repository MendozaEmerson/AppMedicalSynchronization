import React, { useState } from "react";
import Axios from "axios";
import "./Paciente.css"; // Archivo CSS para estilos

function PacienteForm() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState(0);
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const registrarPaciente = () => {
    Axios.post("http://localhost:3001/create2", {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      dni,
      edad,
      correo,
      telefono,
    }).then(() => {
      alert("Registro exitoso. Bienvenido al sistema.");
    });
  };

  const buscarPaciente = () => {
    Axios.get(`http://localhost:3001/paciente/${dni}`)
      .then((response) => {
        if (response.data) {
          const paciente = response.data;
          setNombre(paciente.nombre);
          setApellidoPaterno(paciente.apellidoPaterno);
          setApellidoMaterno(paciente.apellidoMaterno);
          setEdad(paciente.edad);
          setCorreo(paciente.correo);
          setTelefono(paciente.telefono);
          alert("Paciente encontrado. Datos cargados.");
        } else {
          alert("Paciente no encontrado.");
        }
      })
      .catch((error) => {
        console.error("Error al buscar el paciente:", error);
        alert("Ocurrió un error al buscar el paciente.");
      });
  };

  const modificarPaciente = () => {
    Axios.put(`http://localhost:3001/update2/${dni}`, {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      correo,
      telefono,
    })
      .then(() => {
        alert("Información del paciente actualizada exitosamente.");
      })
      .catch((error) => {
        console.error("Error al modificar la información:", error);
        alert("Ocurrió un error al modificar la información.");
      });
  };

  const eliminarPaciente = () => {
    Axios.delete(`http://localhost:3001/delete2/${dni}`)
      .then(() => {
        alert("Paciente eliminado exitosamente.");
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setDni("");
        setEdad(0);
        setCorreo("");
        setTelefono("");
      })
      .catch((error) => {
        console.error("Error al eliminar el paciente:", error);
        alert("Ocurrió un error al eliminar el paciente.");
      });
  };

  return (
    <div className="paciente-form-container">
      <h2 className="form-title">Gestión de Pacientes</h2>
      <div className="formulario">
        <div className="form-group">
          <label>DNI:</label>
          <input
            type="text"
            value={dni}
            onChange={(event) => setDni(event.target.value)}
          />
          <button className="btn btn-search" onClick={buscarPaciente}>
            Buscar
          </button>
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Apellido Paterno:</label>
          <input
            type="text"
            value={apellidoPaterno}
            onChange={(event) => setApellidoPaterno(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Apellido Materno:</label>
          <input
            type="text"
            value={apellidoMaterno}
            onChange={(event) => setApellidoMaterno(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(event) => setEdad(Number(event.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-register" onClick={registrarPaciente}>
            Registrarse
          </button>
          <button className="btn btn-modify" onClick={modificarPaciente}>
            Modificar
          </button>
          <button className="btn btn-delete" onClick={eliminarPaciente}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PacienteForm;
