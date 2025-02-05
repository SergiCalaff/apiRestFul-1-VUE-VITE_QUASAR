<template>
  <div class="contenido">
      <h2>Resultado</h2>
      <div v-if="error" class="error">
          <p>{{ error }}</p>
      </div>

      <div v-else-if="Array.isArray(resultado) && resultado.length > 0">
    <table>
      <thead>
        <tr>
          <th>Id Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in resultado" :key="usuario.idUser">
          <td>{{ usuario.idUser }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <router-link :to="`/actualizar-usuario/${usuario.idUser}`">Modificar</router-link>
          </td>
          <td>
            <router-link :to="`/eliminar-usuario/${usuario.idUser}`" class="error">Eliminar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="resultado && typeof resultado === 'object' && resultado.idUser !== undefined">
    <table>
      <thead>
        <tr>
          <th>Id Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="resultado && resultado.idUser">
          <td>{{ resultado.idUser }}</td>
          <td>{{ resultado.nombre }}</td>
          <td>{{ resultado.email }}</td>
          <td>
            <router-link :to="`/actualizar-usuario/${resultado.idUser}`">Modificar</router-link>
          </td>
          <td>
            <router-link :to="`/eliminar-usuario/${resultado.idUser}`" class="error">Eliminar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

      <div v-else>
          <p>No hay resultados que mostrar</p>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUsuarioStore } from '../stores/usuarioStore';;

const usuarioStore = useUsuarioStore();
const resultado = computed(() => usuarioStore.resultado);
const error = computed(() => usuarioStore.error);

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