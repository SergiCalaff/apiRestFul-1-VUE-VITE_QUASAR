import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    listaUsuarios: [],   //almacenaremos la lista de usuarios para agilizar consultas
    resultado: null,
    error: '',
  }),
  actions: {
    setResultado(datos) {
      this.resultado = datos;
    },
    setError(mensaje) {
      this.error = mensaje;
    },
    setListaUsuarios(usuarios) {
      this.listaUsuarios = usuarios;
    },
    actualizarUsuariosEnLista(usuarioActualizado) {
      const index = this.listaUsuarios.findIndex( u => u.idUser === usuarioActualizado.idUser);
      if (index !== -1){
        this.listaUsuarios[index] = usuarioActualizado;
      }
    },
    eliminarUsuarioDeLista(idUser) {
      this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.idUser !== idUser);
    }
  },
});
