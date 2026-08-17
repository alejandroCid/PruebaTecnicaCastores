import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-fluid py-5 px-4 bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 text-center p-4 p-md-5">
          <div className="card-body">
            {/* Indicador Numérico */}
            <h1 className="display-1 fw-bold text-danger mb-2">404</h1>
            
            {/* Mensaje Principal */}
            <h2 className="fw-bold text-dark mb-3">Página No Encontrada</h2>
            <p className="text-muted mb-4 fs-6">
              Lo sentimos, la ruta a la que intentas acceder no existe o ha sido movida.
            </p>

            {/* Separador Visual */}
            <hr className="my-4 border-secondary opacity-25" />

            {/* Acción Principal */}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link 
                to="/home" 
                className="btn btn-danger btn-lg px-4 gap-3 fw-semibold shadow-sm"
              >
                Volver al Menú Principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;