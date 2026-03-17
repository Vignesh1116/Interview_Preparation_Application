import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await api.post('/register', { name, email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  googleLogin: async (id_token) => {
    const response = await api.post('/google-login', { id_token });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  }
};

export const interviewService = {
  getQuestions: async (topic, difficulty) => {
    const response = await api.get('/questions', { params: { topic, difficulty } });
    return response.data;
  },
  submitAnswer: async (question_id, answer_text) => {
    const response = await api.post('/submit-answer', { question_id, answer_text });
    return response.data;
  },
  getResults: async () => {
    const response = await api.get('/performance');
    return response.data;
  }
};

export default api;
