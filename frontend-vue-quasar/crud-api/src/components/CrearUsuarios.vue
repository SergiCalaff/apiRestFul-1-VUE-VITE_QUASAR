<template>
    <div class="container">
        <h1>Creación de usuarios</h1>
        <div class="form">
            <form @submit.prevent="handleCrearUsuario">
                <div>
                    <label for="nombre">Nombre</label>
                    <input v-model="nombre" type="text" id="nombre" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input v-model="email" type="text" id="email" required>
                </div>
                <div>
                    <label for="password">Contraseña</label>
                    <input v-model="password" type="password" id="password" required autocomplete="new-password">
                </div>
                <button type="submit">Crear usuario</button>
            </form>
        </div>
    </div>

</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import {crearUsuario}  from '../services/usuarioService';

const nombre = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleCrearUsuario = async () => {
    try {
        await crearUsuario({ 
            nombre: nombre.value,
            email: email.value,
            password: password.value,
        });

        router.push('/');  //redirigimos a la lista tras crearlo
    } catch (error) {
        console.error('Error al crear usuario: ', error);
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