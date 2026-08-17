import api from "../api/apiConfig";

const AuthService = {
    login: async (credentials) => {
        try {
            const response = await api.post('api/auth/login', credentials);
            const data = response.data;

            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            localStorage.setItem('token', data.token);

            return data;
        } catch (error) {
            console.error('Error al cargar la información');
            throw error;
        }
    }
}

export default AuthService;