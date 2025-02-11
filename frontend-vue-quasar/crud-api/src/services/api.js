import axios from 'axios';

const username = 'usuario';
const password = '1234';

export const apiCliente = axios.create({
    baseURL: 'http://localhost:8081',
    auth: {
        username: username,
        password: password,
    },
    withCredentials: true,
    });
