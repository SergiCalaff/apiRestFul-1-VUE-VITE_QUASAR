import { createRouter, createWebHistory } from 'vue-router';
import UsuarioPorId from '../components/UsuarioPorId.vue'
import UsuarioPorNombre from '../components/UsuarioPorNombre.vue'
import UsuarioPorEmail from '../components/UsuarioPorEmail.vue';
import CrearUsuarios from '../components/CrearUsuarios.vue';
import ActualizarUsuario from '../components/ActualizarUsuario.vue';
import MainView from '../components/MainView.vue';
import ContenidoResultados from '../components/ContenidoResultados.vue';
import EliminarUsuario from '../components/EliminarUsuario.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView,
  },
  {
    path: '/usuarios/id/:id',
    name: 'UsuarioPorId',
    component: UsuarioPorId,
  },
  {
    path: '/usuarios/nombre/:nombre',
    name: 'UsuarioPorNombre',
    component: UsuarioPorNombre,
  },
  {
    path: '/usuarios/email/:email',
    name: 'UsuarioPorEmail',
    component: UsuarioPorEmail,
  },
  { path: '/crear-usuario',
    component: CrearUsuarios,
  },
  { path: '/actualizar-usuario/:id',
    component: ActualizarUsuario,
  },
  { path: '/buscar-usuarios',
    component: MainView,
  },
  { path: '/contenido-resultados',
    component: ContenidoResultados,
  },
  { path: '/eliminar-usuario/:id',
    component: EliminarUsuario,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
