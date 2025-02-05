import { apiCliente } from './api';

export const crearUsuario = async (usuario) => {
  try {
    const response = await apiCliente.post('/usuarios/crear', usuario);
    return response.data;

  } catch (error) {
    console.error('Error al crear usuario: ', error);
    throw error;
  }
}

export const actualizarUsuario = async (id, usuario) => {
  const usuarioActualizado = {
    idUser: Number(id),
    nombre: usuario.nombre,
    email: usuario.email,
    password: usuario.password
  };
  console.log("USUARIO ACTUALIZADP para enviar al BACKEND: ", usuarioActualizado);
  try  {
    const response = await apiCliente.put(`/usuarios/actualizar/${id}`, usuarioActualizado);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario: ', error);
    throw error;
  }
}

export const getUsuarios = async () => {
  try {
    const response = await apiCliente.get('/usuarios/listar');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios: ', error);
    throw error;
  }
};
export const getUsuarioById = async (id) => {
  try {
    const response = await apiCliente.get(`/usuarios/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al buscar usuario por id: `, error);
    throw error;
  }
};

export const getUsuarioByNombre = async (nombre) => {
    try{ 
        const response = await apiCliente.get(`/usuarios/nombre/${nombre}`);
        return response.data;
    }catch (error) {
        console.error(`Error al buscar usuario por nombre: `, error);
        throw error;
    }
};

export const getUsuarioByEmail = async (email) => {
    try {
        const response = await apiCliente.get(`/usuarios/email/${email}`)
        return response.data;
    } catch (error) {
        console.error(`Error al buscar usuario por email: `, error);
        throw error;
    }
}


