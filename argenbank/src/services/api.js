import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

// Créer une instance axios avec une configuration de base
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur avec réponse du serveur
      return Promise.reject({
        message: error.response.data.message || 'Une erreur est survenue',
        status: error.response.status,
      });
    } else if (error.request) {
      // Erreur sans réponse du serveur
      return Promise.reject({
        message: 'Le serveur ne répond pas',
        status: 503,
      });
    } else {
      // Erreur lors de la configuration de la requête
      return Promise.reject({
        message: 'Erreur de configuration de la requête',
        status: 500,
      });
    }
  }
);

const authService = {
  login: async (email, password) => {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('user');
  }
};

const userService = {
  getProfile: async () => {
    const response = await api.post('/user/profile');
    return response.data;
  },
  
  updateProfile: async ({ firstName, lastName }) => {
    const response = await api.put('/user/profile', { firstName, lastName });
    return response.data;
  }
};

export { authService, userService };