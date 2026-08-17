import React, { useEffect, useState } from 'react';
import InventarioService from '../services/InventarioService';
import Swal from 'sweetalert2';

const Salida = () => {
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modal, setModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [salida, setSalida] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e) => setSalida(e.target.value);

  useEffect(() => {
    obtenerInventario();
  }, []);

  const abrirModal = (producto) => {
    if (producto.cantidad <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Stock',
        text: `El producto "${producto.nombre}" no cuenta con existencias para dar salida.`,
        confirmButtonColor: '#dc3545',
      });
      return;
    }
    setProductoSeleccionado(producto);
    setSalida(1);
    setModal(true);
  };

  const obtenerInventario = async () => {
    setCargando(true);
    try {
      const data = await InventarioService.getAllInventario();
      setInventario(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar datos", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de carga',
        text: 'No se pudo obtener el inventario del servidor.',
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setCargando(false);
    }
  };

  const salidaProducto = async () => {
    const cantidadSalida = Number(salida);

    // Validaciones previas
    if (!productoSeleccionado || !salida || cantidadSalida <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Por favor, ingresa un número mayor a 0.',
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    if (cantidadSalida > productoSeleccionado.cantidad) {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `No puedes retirar ${cantidadSalida} unidades. Stock disponible: ${productoSeleccionado.cantidad}.`,
        confirmButtonColor: '#dc3545',
      });
      return;
    }

    // Modal de confirmación antes de impactar la BD
    const confirmacion = await Swal.fire({
      title: '¿Confirmar salida?',
      text: `Se descontarán ${cantidadSalida} unidades de "${productoSeleccionado.nombre}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar salida',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      await InventarioService.salidaInventario(
        productoSeleccionado,
        cantidadSalida,
        usuario.idUsuario
      );

      setModal(false);
      setProductoSeleccionado(null);
      setSalida(1);

      Swal.fire({
        icon: 'success',
        title: '¡Salida Exitosa!',
        text: 'El stock ha sido actualizado correctamente.',
        timer: 2000,
        showConfirmButton: false,
      });

      await obtenerInventario();
    } catch (error) {
      console.error("Error al registrar salida:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar',
        text: 'Ocurrió un problema al registrar la salida. Intenta nuevamente.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  const inventarioFiltrado = inventario.filter((item) => {
    const busquedaLower = busqueda.toLowerCase().trim();
    const coincideId = item.idProducto?.toString().includes(busquedaLower);
    const coincideNombre = item.nombre?.toLowerCase().includes(busquedaLower);

    return (coincideId || coincideNombre) && item.estatus === 1;
  });

  return (
    <div className="container-fluid py-4 px-4 bg-light min-vh-100">
      {/* Encabezado */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <h2 className="fw-bold m-0 text-danger">
              <i className="bi bi-box-arrow-right me-2"></i>Salida de Productos
            </h2>
            <small className="text-muted">Administra las salidas de stock de tus productos</small>
          </div>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <label className="form-label fw-semibold text-secondary">Buscar por ID o Nombre</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                placeholder="Ej. 102 o 'Refresco'..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-danger">
                <tr>
                  <th className="text-center py-3">ID</th>
                  <th className="py-3">Nombre</th>
                  <th className="text-center py-3">Cantidad</th>
                  <th className="text-center py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      <div className="spinner-border spinner-border-sm text-danger me-2" role="status"></div>
                      Cargando inventario...
                    </td>
                  </tr>
                ) : inventarioFiltrado.length > 0 ? (
                  inventarioFiltrado.map((producto) => (
                    <tr key={producto.idProducto}>
                      <td className="text-center fw-bold text-secondary">{producto.idProducto}</td>
                      <td className="fw-semibold">{producto.nombre}</td>
                      <td className="text-center">
                        <span className={`badge rounded-pill fs-6 ${producto.cantidad > 0 ? 'bg-primary' : 'bg-danger'}`}>
                          {producto.cantidad}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger btn-sm shadow-sm px-3 fw-semibold"
                          onClick={() => abrirModal(producto)}
                          disabled={producto.estatus !== 1 || producto.cantidad <= 0}
                        >
                          <i className="bi bi-dash-circle me-1"></i>Salida
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      No se encontraron registros que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Salida */}
      {modal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">Salida de Producto</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="alert alert-danger py-2 px-3 mb-3 border-0 shadow-sm">
                  <strong>Producto:</strong> {productoSeleccionado?.nombre} (ID: {productoSeleccionado?.idProducto})
                  <br />
                  <small>Stock disponible: <strong>{productoSeleccionado?.cantidad}</strong></small>
                </div>
                <label className="form-label fw-semibold">Cantidad a egresar</label>
                <input
                  type="number"
                  min={1}
                  max={productoSeleccionado?.cantidad}
                  className="form-control form-control-lg"
                  value={salida}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer bg-light border-0">
                <button className="btn btn-secondary px-4 fw-semibold" onClick={() => setModal(false)}>Cancelar</button>
                <button className="btn btn-danger px-4 fw-semibold" onClick={salidaProducto}>Confirmar Salida</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Salida;