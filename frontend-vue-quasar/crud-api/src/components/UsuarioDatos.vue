<template>
  <div class="usuario-datos">
      <h2>Datos del Usuario</h2>
      
      <div v-if="error" class="error">
          <p>{{ error }}</p>
      </div>

      <div v-else-if="usuario">
          <TablaUsuario :usuario="usuario"></TablaUsuario>
      </div>
      
      <div v-else>
      <p>No hay detalles para mostrar.</p>
    </div>
  </div>
</template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';  
  import { getUsuarioById } from '../services/usuarioService';  
  import TablaUsuario from './TablaUsuario.vue'; 
  
  const error = ref('');
  const usuario = ref(null);
  const route = useRoute();
  
  const idUsuario = route.params.id;
  
  const obtenerUsuario = async () => {
    try {
      const data = await getUsuarioById(idUsuario);
      usuario.value = data;  
      error.value = '';      
    } catch (err) {
      error.value = 'Usuario no encontrado o error en la consulta: ' + err.message;
    }
  };
  

  onMounted(() => {
    obtenerUsuario();
  });
  </script>
  
  <style scoped>
  .usuario-datos {
    padding: 1em;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 0.5em;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .error {
    color: red;
  }
  </style>
  