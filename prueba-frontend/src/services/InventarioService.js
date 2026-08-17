import api from "../api/apiConfig";

const InventarioService = {
    getAllInventario: async () => {
        try {
            const response = await api.get('api/inventario');
            return response.data;
        } catch (error) {
            console.error('Error al cargar la información');
            throw error;
        }
    },
    addInventario: async (inventario) => {
        try {
            const response = await api.post('api/inventario', inventario);
            return response;
        } catch (error) {
            console.error('Error al cargar la información');
            throw error;
        }
    },
    entradaInventario: async (inventario, cant, idUsuario) => {
        try {
            const response = await api.patch(`api/inventario/entrada/${cant}`, inventario, {
                params: { idUsuario }
            });
            return response; 
        } catch (error) {
            console.error('Error al registrar la entrada de producto', error);
            throw error;
        }
    },
    salidaInventario: async (inventario, cant, idUsuario) => {
        try {
            const response = await api.patch(`api/inventario/salida/${cant}`, inventario, {
                params: { idUsuario } 
            });
            return response; 
        } catch (error) {
            console.error('Error al registrar la entrada de producto', error);
            throw error;
        }
    },
    estatusInventario: async (id) => {
        try {
            const response = await api.delete(`api/inventario/${id}`);
            return response;
        } catch (error) {
            console.error('Error al registrar la entrada de producto', error);
            throw error;
        }
    }
}

export default InventarioService