<template>
  <div class="header">
      <div>
        <button @click="listaUsuarios">Lista de usuarios</button>
      </div>

      <div>
        <form @submit.prevent="submitForm">
          <div>
            <label for="id-usuario">Id: </label>
            <input
              type="text"
              v-model="idUsuario"
              name="id-usuario"
              id="id-usuario"
              @focus="limpiarOtrosInputs('id')"
            />
          </div>
          <div>
            <label for="nombre-usuario">Nombre: </label>
            <input
              type="text"
              v-model="nombreUsuario"
              name="nombre-usuario"
              id="nombre-usuario"
              @focus="limpiarOtrosInputs('nombre')"
            />
          </div>
          <div>
            <label for="email-usuario">Email: </label>
            <input
              type="text"
              v-model="emailUsuario"
              name="email-usuario"
              id="email-usuario"
              @focus="limpiarOtrosInputs('email')"
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  import {
    getUsuarios,
    getUsuarioById,
    getUsuarioByNombre,
    getUsuarioByEmail,
  } from '../services/usuarioService';
  import { useUsuarioStore } from '../stores/usuarioStore';
  
  const idUsuario = ref('');
  const nombreUsuario = ref('');
  const emailUsuario = ref('');
  const usuarioStore = useUsuarioStore();
  
  // Limpiamos inputs sin foco
  const limpiarOtrosInputs = (focusedField) => {
    if (focusedField !== 'id') idUsuario.value = '';
    if (focusedField !== 'nombre') nombreUsuario.value = '';
    if (focusedField !== 'email') emailUsuario.value = '';
  };
  
  const listaUsuarios = async () => {
    try {
      const usuarios = await getUsuarios();
      usuarioStore.setResultado(usuarios);
      usuarioStore.setError('');
    } catch (err) {
      usuarioStore.setError('No se han encontrado resultados: ' + err.message);
    }
  };

  watchEffect(() => {
    if (usuarioStore.listaUsuarios.length === 0) {
      listaUsuarios();
    }
  });
  
  const buscarPorId = async () => {
  const id = parseInt(idUsuario.value, 10);

  if (isNaN(id) || id <= 0) {
    alert('Ingresa un id válido.');
    return;
  }

  // Limpiamos el estado antes de navegar para ver si se soluciona error ID y EMAIL
  usuarioStore.setResultado(null);
  usuarioStore.setError('');

  try {
    const resultado = await getUsuarioById(id);

    if (resultado && resultado.idUser) {
      usuarioStore.setResultado(resultado);
      usuarioStore.setError('');
    } else {
      usuarioStore.setError('Usuario no encontrado o datos inválidos');
    }
  } catch (err) {
    usuarioStore.setError('Error al obtener el usuario: ' + err.message);
  }
};

  
  const buscarPorNombre = async () => {
    if (!nombreUsuario.value.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }

    //limpiamos el estado antes de navegar para ver si se soluciona error ID y EMAIL
    usuarioStore.setResultado(null);
    usuarioStore.setError('');

    try {
      const resultado = await getUsuarioByNombre(nombreUsuario.value);
      usuarioStore.setResultado(resultado);
      usuarioStore.setError('');
    } catch (err) {
      usuarioStore.setError('Error al buscar usuario por nombre: ' + err.message);
    }
  };
  
  const buscarPorEmail = async () => {
    
    const email = emailUsuario.value.trim();
    
    if (!email) {
      alert('Por favor, ingresa un email válido');
      return;
    }

    //limpiamos el estado antes de navegar para ver si se soluciona error ID y EMAIL
    usuarioStore.setResultado(null);
    usuarioStore.setError('');

    try {
      const emailCaracteresEspeciales = encodeURIComponent(email);
      const resultado = await getUsuarioByEmail(emailCaracteresEspeciales);
      
      if (resultado) {
        usuarioStore.setResultado(resultado);
        usuarioStore.setError('');
      } else {
        usuarioStore.setError('Error al buscar usuario por email');
      }
    } catch (err) {
      console.error('Error al buscarPorEmail', err);
      
      if (err.response && err.response.status == 404) {
        usuarioStore.setError('Usuario no encontrado');
      } else {
        usuarioStore.setError('Error al buscar usuario por email ' + err.message);
      }
    }
  };
  
  //Filtramos que requisito buscamos
  const submitForm = () => {
    if (idUsuario.value) {
      buscarPorId();
    } else if (nombreUsuario.value) {
      buscarPorNombre();
    } else if (emailUsuario.value) {
      buscarPorEmail();
    } else {
      alert('Por favor ingresa un valor en al menos uno de los campos.');
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  
  form {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-start;
  }
  
  input {
    margin-bottom: 0.5em;
  }
  
  button {
    margin-top: 1em;
  }
  </style>
  