<template>
    <div class="container">
        <h1>Actualizar usuario</h1>
        <div class="form">
            <form @submit.prevent="handleActualizarUsuario">
                <div>
                    <label for="nombre">Nombre</label>
                    <input v-model="usuario.nombre" type="text" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input v-model="usuario.email" type="text" required>
                </div>
                <div>
                    <label for="password">Contraseña</label>
                    <input v-model="usuario.password" type="text" required>
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    </div>

</template>


<script setup>
import {ref, onMounted, toRaw} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useUsuarioStore } from '../stores/usuarioStore';
import { getUsuarioById, actualizarUsuario } from '../services/usuarioService';

const route = useRoute();
const router = useRouter();
const usuario = ref({nombre: '', email: '', password: ''});
const store = useUsuarioStore();

onMounted (async () => {
    try {
    const data = await getUsuarioById(route.params.id);
    usuario.value = data;
} catch (error) {
    console.error('Error al obtener el usuario: ', error);
}
});

const handleActualizarUsuario = async () => {
    try {
        const usuarioActualizado = await actualizarUsuario(route.params.id, toRaw(usuario.value));
        store.actualizarUsuariosEnLista(usuarioActualizado);
        router.push('/');  //regresamos al listado una vez modificado
    } catch (error) {
        console.error("Error al actualizar usuario: ", error);
    }
}
</script>


<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 1em;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1em;
}
</style>