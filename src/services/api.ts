import axios from 'axios';

const api =
  process.env.NODE_ENV === 'development'
    ? axios.create({
        baseURL: 'http://192.168.0.10:3333/api',
      })
    : axios.create({
        baseURL: 'http://agendamento.cro-rj.org.br/api',
      });

export default api;
