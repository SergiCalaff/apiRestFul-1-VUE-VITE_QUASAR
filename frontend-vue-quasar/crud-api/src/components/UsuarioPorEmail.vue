<template>
    <div class="usuario-datos">
        <h2>Datos del Usuario</h2>
        
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="usuario">
            <ContenidoResultados v-if="usuario && Object.keys(usuario).length > 0" :resultado="usuario" />
            <p v-else>No se encontraron resultados</p>
        </div>
        
        <div v-else>
        <p>No hay detalles para mostrar.</p>
      </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import { getUsuarioByEmail } from '../services/usuarioService';
import ContenidoResultados from './ContenidoResultados.vue';

const usuario = ref(null);
const error = ref('');
const route = useRoute();

const obtenerUsuarioPorEmail = async (email) => {
    try {
        const datosUsuario = await getUsuarioByEmail(email);

        if (datosUsuario && Object.keys(datosUsuario).length > 0) {
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
    const email = route.params.email;
    obtenerUsuarioPorEmail(email);
});
</script>

<style scoped>

</style>