// mobile/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // AQUI ESTÁ A MUDANÇA IMPORTANTE!
  baseURL: 'http://192.168.0.15:3333/api',
});

export default api;