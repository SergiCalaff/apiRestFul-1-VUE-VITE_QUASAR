<template>
  <div class="app">
    <div>
      <router-link to="/crear-usuario"><button>Crear usuarios</button></router-link>
    </div>
    <div>
      <router-link to="/buscar-usuarios"><button>Buscar usuarios</button></router-link>
    </div>
    <div>
      <router-link to="/eliminar-usuario"><button>Eliminar usuarios</button></router-link>
    </div>
    <div>
      <router-link to="/"><button>Inicio</button></router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style soped>
.app {
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 10px;
  margin-bottom: 30px;
}
</style>
