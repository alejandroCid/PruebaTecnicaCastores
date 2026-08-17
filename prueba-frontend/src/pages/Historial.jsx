import React, { useEffect, useState } from 'react';
import HistorialService from '../services/HistorialService';
import Swal from 'sweetalert2';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');

  useEffect(() => {
    getHistorial();
  }, []);

  const getHistorial = async () => {
    setCargando(true);
    try {
      const data = await HistorialService.getAllHistorial();
      const registros = Array.isArray(data) ? data : [];
      setHistorial(registros);

      if (registros.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Sin movimientos',
          text: 'No hay registros de historial de movimientos en la base de datos.',
          confirmButtonColor: '#dc3545',
        });
      }
    } catch (error) {
      console.error("Error al cargar datos", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Ocurrió un problema al obtener el historial de movimientos.',
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setCargando(false);
    }
  };

  // Orden descendente (más recientes / ID mayor primero) + Filtrado
  const historialFiltrado = [...historial]
    .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora) || b.movimiento - a.movimiento)
    .filter((item) => {
      const term = busqueda.toLowerCase().trim();
      
      const idMovimiento = item.movimiento?.toString() || '';
      const nombreUsuario = item.usuario?.nombre?.toLowerCase() || '';
      const nombreProducto = item.producto?.nombre?.toLowerCase() || '';

      const coincideTexto = 
        idMovimiento.includes(term) ||
        nombreUsuario.includes(term) ||
        nombreProducto.includes(term);

      const coincideTipo = 
        filtroTipo === 'TODOS' ? true :
        filtroTipo === 'E' ? item.tipoMovimiento === 'E' :
        filtroTipo === 'S' ? item.tipoMovimiento === 'S' : true;

      return coincideTexto && coincideTipo;
    });

  return (
    <div className="container-fluid py-4 px-4 bg-light min-vh-100">
      {/* Encabezado */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h2 className="fw-bold m-0 text-danger">
              <i className="bi bi-clock-history me-2"></i>Historial de Movimientos
            </h2>
            <small className="text-muted">Consulta el registro detallado de entradas y salidas de inventario</small>
          </div>
          <button 
            className="btn btn-outline-danger btn-sm shadow-sm fw-semibold"
            onClick={getHistorial}
            disabled={cargando}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
          </button>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <label className="form-label fw-semibold text-secondary">Buscar por Producto, Usuario o ID</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                placeholder="Ej. 'Carlos', 'Galletas' o ID de movimiento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold text-secondary">Tipo de Movimiento</label>
              <select
                className="form-select form-select-lg bg-light"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="TODOS">Todos los tipos</option>
                <option value="E">Solo Entradas</option>
                <option value="S">Solo Salidas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Historial con Scroll y Encabezado Fijo */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive" style={{ maxHeight: '520px', overflowY: 'auto' }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="table-danger sticky-top" style={{ zIndex: 1 }}>
                <tr>
                  <th className="text-center py-3">Movimiento</th>
                  <th className="text-center py-3">Usuario</th>
                  <th className="text-center py-3">Producto</th>
                  <th className="text-center py-3">Cantidad</th>
                  <th className="text-center py-3">Tipo</th>
                  <th className="text-center py-3">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-muted">
                      <div className="spinner-border spinner-border-sm text-danger me-2" role="status"></div>
                      Cargando historial de movimientos...
                    </td>
                  </tr>
                ) : historialFiltrado.length > 0 ? (
                  historialFiltrado.map((registro) => (
                    <tr key={registro.movimiento}>
                      <td className="text-center fw-bold text-secondary">{registro.movimiento}</td>
                      <td className="text-center fw-semibold">{registro.usuario?.nombre || 'N/A'}</td>
                      <td className="text-center">{registro.producto?.nombre || 'N/A'}</td>
                      <td className="text-center">
                        <span className="badge rounded-pill bg-secondary fs-6">
                          {registro.cantidad}
                        </span>
                      </td>
                      <td className="text-center">
                        {registro.tipoMovimiento === 'E' ? (
                          <span className="badge bg-success-subtle text-success border border-success px-3 py-2">
                            Entrada
                          </span>
                        ) : registro.tipoMovimiento === 'S' ? (
                          <span className="badge bg-danger-subtle text-danger border border-danger px-3 py-2">
                            Salida
                          </span>
                        ) : (
                          <span className="badge bg-secondary-subtle text-secondary border px-3 py-2">
                            {registro.tipoMovimiento}
                          </span>
                        )}
                      </td>
                      <td className="text-center text-muted">
                        {registro.fechaHora
                          ? new Date(registro.fechaHora).toLocaleString('es-MX', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: true,
                            })
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-muted">
                      No se encontraron movimientos registrados con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historial;