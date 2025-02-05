import axios from 'axios';

export const apiCliente = axios.create({
    baseURL: 'http://localhost:8081',
    });
