<template>
    <div class="container">
        <h1>Eliminar usuario</h1>
        <h4>¿Seguro que deseas eliminar el usuario: {{ id }}?</h4>
        <button @click="handleEliminarUsuario">Si</button>
        <RouterLink to="/"><button>No</button></RouterLink>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { eliminarUsuario } from '../services/usuarioService';
import {useUsuarioStore} from '../stores/usuarioStore';

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);
const store = useUsuarioStore();

const handleEliminarUsuario = async () => {
    try {
        
        if (!id.value)  {
            throw new Error('El ID del usuario es inválido');
        }

        await eliminarUsuario(id.value);
        store.eliminarUsuarioDeLista(id.value);  //Eliminamos el usuario en la Store
        router.push('/');
        
    } catch (error) {
        console.error ('Error al eliminar el usuario: ' + error);
        alert('Ha habido un error al eliminar el usuario');
    }
};

</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 1em;
}

h1 {
    margin-bottom: 20px;;
}
</style>