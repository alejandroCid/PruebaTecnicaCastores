import React, { useState, useEffect } from 'react';
import InventarioService from '../services/InventarioService';
import Swal from 'sweetalert2';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [rol, setRol] = useState();

  // Modales
  const [modalP, setModalP] = useState(false);
  const [modalE, setModalE] = useState(false);

  // Formularios / Selección
  const [pNombre, setPNombre] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [entrada, setEntrada] = useState(1);

  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstatus, setFiltroEstatus] = useState('TODOS');

  useEffect(() => {
    obtenerInventario()
    const usuarioGuardado = localStorage.getItem('usuario');
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    setRol(usuario?.rol);
  }, []);

  const handleChangeNombre = (e) => setPNombre(e.target.value);
  const handleChangeEntrada = (e) => setEntrada(e.target.value);

  const abrirModalEntrada = (producto) => {
    setProductoSeleccionado(producto);
    setEntrada(1);
    setModalE(true);
  };

  const obtenerInventario = async () => {
    setCargando(true);
    try {
      const data = await InventarioService.getAllInventario();
      setInventario(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Ocurrió un problema al obtener la lista de productos.',
        confirmButtonColor: '#dc3545',
      });
    } finally {
      setCargando(false);
    }
  };

  const guardarProducto = async () => {
    if (!pNombre.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Ingresa el nombre del producto para continuar.',
        confirmButtonColor: '#198754',
      });
      return;
    }

    try {
      const nuevoProducto = {
        nombre: pNombre.trim(),
        cantidad: 0,
        estatus: 1,
      };

      await InventarioService.addInventario(nuevoProducto);
      setPNombre('');
      setModalP(false);

      Swal.fire({
        icon: 'success',
        title: '¡Producto registrado!',
        text: 'El nuevo producto se agregó correctamente al inventario.',
        timer: 1800,
        showConfirmButton: false,
      });

      await obtenerInventario();
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'No se pudo guardar el producto. Inténtalo nuevamente.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  const entradaProducto = async () => {
    if (!productoSeleccionado || !entrada || Number(entrada) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'Ingresa una cantidad mayor a cero.',
        confirmButtonColor: '#0d6efd',
      });
      return;
    }

    try {
      const idUsuario = 1;

      await InventarioService.entradaInventario(
        productoSeleccionado,
        Number(entrada),
        idUsuario
      );

      const cantidadAgregada = entrada;
      const nombreProd = productoSeleccionado.nombre;

      setProductoSeleccionado(null);
      setEntrada(1);
      setModalE(false);

      Swal.fire({
        icon: 'success',
        title: '¡Stock actualizado!',
        text: `Se agregaron ${cantidadAgregada} unidades a "${nombreProd}".`,
        timer: 1800,
        showConfirmButton: false,
      });

      await obtenerInventario();
    } catch (error) {
      console.error('Error al registrar entrada:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de inventario',
        text: 'Ocurrió un error al intentar registrar la entrada del producto.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  const cambiarEstatus = async (producto) => {
    const esBaja = producto.estatus === 1;
    const accionTexto = esBaja ? 'dar de baja' : 'dar de alta';

    const result = await Swal.fire({
      title: `¿Deseas ${accionTexto} este producto?`,
      html: `<strong>${producto.nombre}</strong> (ID: ${producto.idProducto})`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: esBaja ? '#dc3545' : '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Sí, ${accionTexto}`,
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await InventarioService.estatusInventario(producto.idProducto);

        Swal.fire({
          icon: 'success',
          title: 'Estatus modificado',
          text: `El producto fue ${esBaja ? 'dado de baja' : 'dado de alta'} con éxito.`,
          timer: 1600,
          showConfirmButton: false,
        });

        await obtenerInventario();
      } catch (error) {
        console.error('Error al cambiar estatus:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar estatus',
          text: 'No se pudo actualizar el estado del producto.',
          confirmButtonColor: '#dc3545',
        });
      }
    }
  };

  // Lógica de filtrado dinámico (por ID o Nombre) + Select Estatus
  const inventarioFiltrado = inventario.filter((item) => {
    const busquedaLower = busqueda.toLowerCase().trim();

    const coincideId = item.idProducto?.toString().includes(busquedaLower);
    const coincideNombre = item.nombre?.toLowerCase().includes(busquedaLower);
    const coincideTexto = coincideId || coincideNombre;

    const coincideEstatus =
      filtroEstatus === 'TODOS' ? true :
        filtroEstatus === 'ALTA' ? item.estatus === 1 :
          filtroEstatus === 'BAJA' ? item.estatus !== 1 : true;

    return coincideTexto && coincideEstatus;
  });

  return (
    <div className="container-fluid py-4 px-4 bg-light min-vh-100">
      {/* Encabezado */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <h2 className="fw-bold m-0 text-danger">
              <i className="bi bi-box-seam me-2"></i>Gestión de Inventario
            </h2>
            <small className="text-muted">Administra las existencias y estados de tus productos</small>
          </div>
          {rol === 1 && (
            <button
              className="btn btn-success btn-lg shadow-sm d-flex align-items-center gap-2"
              onClick={() => setModalP(true)}
            >
              <i className="bi bi-plus-circle-fill"></i> Añadir producto
            </button>
          )}
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
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold text-secondary">Filtrar por Estatus</label>
              <select
                className="form-select form-select-lg bg-light"
                value={filtroEstatus}
                onChange={(e) => setFiltroEstatus(e.target.value)}
              >
                <option value="TODOS">Todos los estatus</option>
                <option value="ALTA">Solo Altas</option>
                <option value="BAJA">Solo Bajas</option>
              </select>
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
                  <th className="text-center py-3">Estatus</th>
                  {rol === 1 && (
                    <th className="text-center py-3">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
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
                        <span className={`badge rounded-pill fs-6 ${producto.cantidad > 0 ? 'bg-primary' : 'bg-warning text-dark'}`}>
                          {producto.cantidad}
                        </span>
                      </td>
                      <td className="text-center">
                        {producto.estatus === 1 ? (
                          <span className="badge bg-success-subtle text-success border border-success px-3 py-2">Alta</span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger px-3 py-2">Baja</span>
                        )}
                      </td>
                      {rol === 1 && (
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm me-2 shadow-sm"
                            onClick={() => abrirModalEntrada(producto)}
                            disabled={producto.estatus !== 1}
                          >
                            Entrar producto
                          </button>
                          <button
                            className={`btn btn-sm shadow-sm ${producto.estatus === 1 ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={() => cambiarEstatus(producto)}
                          >
                            {producto.estatus === 1 ? 'Dar de baja' : 'Dar de alta'}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No se encontraron registros que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Producto */}
      {modalP && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">Nuevo Producto</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalP(false)}></button>
              </div>
              <div className="modal-body p-4">
                <label className="form-label fw-semibold">Nombre del Producto</label>
                <input
                  type="text"
                  placeholder="Ej. Galletas de Avena"
                  className="form-control form-control-lg"
                  value={pNombre}
                  onChange={handleChangeNombre}
                />
              </div>
              <div className="modal-footer bg-light border-0">
                <button className="btn btn-secondary px-4" onClick={() => setModalP(false)}>Cancelar</button>
                <button className="btn btn-success px-4" onClick={guardarProducto}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Entrada de Producto */}
      {modalE && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">Entrada de Producto</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalE(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="alert alert-danger py-2 px-3 mb-3">
                  <strong>Producto:</strong> {productoSeleccionado?.nombre} (ID: {productoSeleccionado?.idProducto})
                </div>
                <label className="form-label fw-semibold">Cantidad a ingresar</label>
                <input
                  type="number"
                  min={1}
                  className="form-control form-control-lg"
                  value={entrada}
                  onChange={handleChangeEntrada}
                />
              </div>
              <div className="modal-footer bg-light border-0">
                <button className="btn btn-secondary px-4" onClick={() => setModalE(false)}>Cancelar</button>
                <button className="btn btn-primary px-4" onClick={entradaProducto}>Actualizar Stock</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;