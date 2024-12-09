import React, { useState } from "react";
import Axios from "axios";
import './Doctor.css'; // Archivo CSS para estilos

function DoctorForm() {
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [dniPaciente, setDniPaciente] = useState("");
  const [edadPaciente, setEdadPaciente] = useState(0);
  const [diagnostico, setDiagnostico] = useState("");

  const registrarPaciente = () => {
    Axios.post("http://localhost:3001/create", {
      dni: dniPaciente,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      nombre: nombrePaciente,
      edad: edadPaciente,
      diagnostico: diagnostico,
    }).then(() => {
      alert("Paciente registrado exitosamente");
    });
  };

  const buscarPaciente = () => {
    Axios.get(`http://localhost:3001/patient/${dniPaciente}`)
      .then((response) => {
        if (response.data) {
          const paciente = response.data;
          setNombrePaciente(paciente.nombre);
          setApellidoPaterno(paciente.apellidoPaterno);
          setApellidoMaterno(paciente.apellidoMaterno);
          setEdadPaciente(paciente.edad);
          setDiagnostico(paciente.diagnostico || "");
          alert("Paciente encontrado y datos cargados");
        } else {
          alert("Paciente no encontrado");
        }
      })
      .catch((error) => {
        console.error("Error al buscar el paciente:", error);
        alert("Ocurrió un error al buscar el paciente");
      });
  };

  const modificarPaciente = () => {
    Axios.put(`http://localhost:3001/update/${dniPaciente}`, {
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      nombre: nombrePaciente,
      edad: edadPaciente,
      diagnostico: diagnostico,
    })
      .then(() => {
        alert("Información del paciente actualizada exitosamente");
      })
      .catch((error) => {
        console.error("Error al modificar la información:", error);
        alert("Ocurrió un error al modificar la información");
      });
  };

  const eliminarPaciente = () => {
    Axios.delete(`http://localhost:3001/delete/${dniPaciente}`)
      .then(() => {
        alert("Paciente eliminado exitosamente");
        setNombrePaciente("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setDniPaciente("");
        setEdadPaciente(0);
        setDiagnostico("");
      })
      .catch((error) => {
        console.error("Error al eliminar el paciente:", error);
        alert("Ocurrió un error al eliminar el paciente");
      });
  };

  return (
    <div className="doctor-form-container">
      <h2>Gestión de Pacientes</h2>
      <div className="form">
        <label>
          DNI:
          <input
            type="text"
            value={dniPaciente}
            onChange={(event) => setDniPaciente(event.target.value)}
          />
        </label>
        <button onClick={buscarPaciente}>Buscar Paciente</button>
        <label>
          Apellido Paterno:
          <input
            type="text"
            value={apellidoPaterno}
            onChange={(event) => setApellidoPaterno(event.target.value)}
          />
        </label>
        <label>
          Apellido Materno:
          <input
            type="text"
            value={apellidoMaterno}
            onChange={(event) => setApellidoMaterno(event.target.value)}
          />
        </label>
        <label>
          Nombre del Paciente:
          <input
            type="text"
            value={nombrePaciente}
            onChange={(event) => setNombrePaciente(event.target.value)}
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            value={edadPaciente}
            onChange={(event) => setEdadPaciente(Number(event.target.value))}
          />
        </label>
        <label>
          Diagnóstico:
          <textarea
            value={diagnostico}
            onChange={(event) => setDiagnostico(event.target.value)}
          />
        </label>
        <div className="button-group">
          <button className="register-button" onClick={registrarPaciente}>
            Registrar Paciente
          </button>
          <button className="update-button" onClick={modificarPaciente}>
            Modificar Información
          </button>
          <button className="delete-button" onClick={eliminarPaciente}>
            Eliminar Paciente
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorForm;
