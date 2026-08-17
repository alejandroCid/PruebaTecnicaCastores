import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Permisos } from '../routes/Permisos';

const Header = () => {
  const navigate = useNavigate();
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const rol = usuario?.rol;

  // Enlaces de navegación con sus respectivos íconos
  const menuItems = [
    { label: 'Inventario', path: '/inventario', icon: 'bi-box-seam', permiso:'inventario' },
    { label: 'Salidas', path: '/salida', icon: 'bi-box-arrow-up-right', permiso:'salida' },
    { label: 'Historial', path: '/historial', icon: 'bi-clock-history', permiso:'historico' },
  ];
  const canSee = (page) => Permisos[page]?.includes(rol);

  const logout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tendrás que ingresar tus credenciales de nuevo',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      await Swal.fire({
        icon: 'success',
        title: 'Sesión Finalizada',
        timer: 1200,
        showConfirmButton: false,
      });
      navigate('/login');
    }
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm px-3 sticky-top w-100">
      <div className="container-fluid px-0">

        {/* Título de la Aplicación */}
        <NavLink to="/home" className="navbar-brand d-flex align-items-center fw-bold me-4">
          <i className="bi bi-boxes fs-3 me-2"></i>
          <span>Sistema de Inventario</span>
        </NavLink>

        {/* Links de Navegación Principal */}
        {usuario && (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            {menuItems.map((item) => (
              canSee(item.permiso) && (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link px-3 py-2 rounded-2 d-flex align-items-center gap-2 transition-all ${isActive
                        ? 'bg-white text-danger fw-bold shadow-sm'
                        : 'text-white hover-bg-light'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        )}

        {/* Área de Usuario / Sesión a la derecha */}
        <div className="d-flex align-items-center gap-3 ms-auto pt-2 pt-lg-0">
          {usuario ? (
            <>
              <div className="d-flex align-items-center text-white me-2">
                <div className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center me-2 font-monospace fw-bold" style={{ width: '36px', height: '36px' }}>
                  {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="d-none d-sm-block text-start lh-1">
                  <span className="fw-semibold d-block text-truncate" style={{ maxWidth: '140px' }}>
                    {usuario.nombre}
                  </span>
                  <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                    {usuario.correo}
                  </small>
                </div>
              </div>

              <button
                className="btn btn-warning fw-semibold text-dark d-flex align-items-center gap-2 shadow-sm"
                onClick={logout}
              >
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-outline-light fw-semibold ms-auto">
              <i className="bi bi-person-fill me-1"></i> Iniciar Sesión
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;