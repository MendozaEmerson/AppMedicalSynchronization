import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de tener este archivo CSS

function Login() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'doctor') navigate('/doctor');
    else if (role === 'paciente') navigate('/paciente');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Seleccione su rol</h1>
      <div className="button-container">
        <button className="role-button doctor-button" onClick={() => handleRoleSelection('doctor')}>
          Doctor
        </button>
        <button className="role-button paciente-button" onClick={() => handleRoleSelection('paciente')}>
          Paciente
        </button>
      </div>
    </div>
  );
}

export default Login;
