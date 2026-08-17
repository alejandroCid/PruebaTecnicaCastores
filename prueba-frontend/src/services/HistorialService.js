import api from "../api/apiConfig";

const HistorialService = {
    getAllHistorial: async () => {
        try {
            const response = await api.get('api/historial');
            return response.data;
        } catch (error) {
            console.error('Error al cargar la información');
            throw error;
        }
    },
}

export default HistorialService;