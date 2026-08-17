import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  // Recupear datos del usuario autenticado
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : { nombre: 'Usuario' };

  return (
    <div className="container py-4">
      {/* Banner de Bienvenida */}
      <div className="p-4 p-md-5 mb-4 rounded-3 bg-white shadow-sm border-start border-4 border-danger">
        <div className="container-fluid py-2">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
            <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fw-semibold">
              Panel Principal
            </span>
            {usuario?.rol && (
              <span className="badge bg-secondary-subtle text-dark border px-3 py-2 rounded-pill text-capitalize fw-normal">
                <i className="bi bi-shield-lock me-1"></i>
                {usuario.rol}
              </span>
            )}
            <small className="text-muted ms-sm-auto">
              <i className="bi bi-calendar3 me-1"></i>
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </small>
          </div>

          <h1 className="display-6 fw-bold text-dark mb-2">
            ¡Hola de nuevo, {usuario?.nombre}!
          </h1>

          <p className="col-md-10 fs-6 text-secondary mb-0">
            Has ingresado con el rol de 
            <strong className="text-dark text-capitalize">
              {usuario?.rol === 1 ?(
                " Administrador"
              ):(
                " Almacenista"
              )}
            </strong>. 
          </p>
        </div>
      </div>

    </div>
  );
};

export default Home;