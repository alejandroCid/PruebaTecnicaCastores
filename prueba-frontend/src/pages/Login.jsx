  import React, { useState } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useNavigate } from 'react-router-dom';
  import AuthService from '../services/AuthService';

  const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
      correo: '',
      contrasena: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      await login();
    };

    const login = async () => {
      setLoading(true);

      try {
        const response = await AuthService.login(credentials);

        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido, ${response.usuario.nombre}!`,
          timer: 1500,
          showConfirmButton: false
        });

        navigate("/home");  
        
      } catch (error) {
        const errorMsg = error.response?.error || 'Error de conexión con el servidor';
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: errorMsg,
          confirmButtonColor: '#dc3545'
        });
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
        <div className="card shadow-lg border-0 w-100" style={{ maxWidth: '400px' }}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <i className="bi bi-person-badge-fill display-4 text-primary"></i>
              <h3 className="fw-bold mt-2">Iniciar Sesión</h3>
              <p className="text-muted small">Ingresa tus credenciales de acceso</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control form-control-lg bg-light"
                  placeholder="correo@ejemplo.com"
                  value={credentials.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  className="form-control form-control-lg bg-light"
                  placeholder="••••••••"
                  maxLength={25}
                  value={credentials.contrasena}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Validando...
                  </span>
                ) : (
                  'Ingresar'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Login;