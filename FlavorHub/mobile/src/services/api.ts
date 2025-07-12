import axios from 'axios';

const IP_DO_SEU_COMPUTADOR = '192.168.0.191';

const api = axios.create({
  baseURL: `http://${IP_DO_SEU_COMPUTADOR}:3333/api`,
});

export default api;
