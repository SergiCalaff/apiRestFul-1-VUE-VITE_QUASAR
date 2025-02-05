<template>
    <div class="usuario-datos">
        <h2>Datos del Usuario</h2>
        
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="usuario">
            <ContenidoResultados :resultado="usuario" />
        </div>
        
        <div v-else>
        <p>No hay detalles para mostrar.</p>
      </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { getUsuarioByNombre } from '../services/usuarioService';
import ContenidoResultados from './ContenidoResultados.vue';

const usuario = ref(null);
const error = ref('');
const route = useRoute();

const obtenerUsuarioPorNombre = async (nombre) => {
    try {
        const datosUsuario = await getUsuarioByNombre(nombre);

        if (datosUsuario) {
          usuario.value = datosUsuario;
          error.value = '';
        } else {
          error.value = "Usuario no encontrado";
        }
    } catch (err) {
        error.value = 'Error al obtener los datos del usuario: ' + err.message;
    }
};

onMounted(() => {
    const nombre = route.params.nombre;
    obtenerUsuarioPorNombre(nombre);
})
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
  margin-bottom: 1em;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1em;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>