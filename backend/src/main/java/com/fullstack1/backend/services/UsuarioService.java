package com.fullstack1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fullstack1.backend.models.Usuario;
import com.fullstack1.backend.repositories.IUsuarioRepository;

import lombok.RequiredArgsConstructor;
import com.fullstack1.backend.utils.UtilEncriptacion;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final IUsuarioRepository usuarioRepo;

    public Usuario crearUsuario(Usuario usuario) {

        try {
            if (usuarioRepo.existsByEmail(usuario.getEmail())) {
                throw new IllegalArgumentException("Ya existe un usuario con este email.");
            }

            String passwordEncriptado = UtilEncriptacion.encriptar(usuario.getPassword());
            usuario.setPassword(passwordEncriptado);

            return usuarioRepo.save(usuario);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al encriptar la contraseña: " + e.getMessage());
        }
    };

    public Usuario actualizarUsuario(Long id, Usuario usuario) {

        Usuario usuarioExiste = usuarioRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se ha encontrado al usuario con id: " + id));

        usuarioExiste.setNombre(usuario.getNombre());
        usuarioExiste.setEmail(usuario.getEmail());

        try {
            String passwordEncriptado = UtilEncriptacion.encriptar(usuario.getPassword());
            usuarioExiste.setPassword(passwordEncriptado);
        } catch (Exception e) {
            throw new RuntimeException("Error al encriptar la contraseña");
        }

        return usuarioRepo.save(usuarioExiste);
    }

    public void eliminarUsuario(Long id) {

        if (!usuarioRepo.existsById(id)) {
            throw new NoSuchElementException("No se ha encontrado al usuario con id: " + id);
        }
        usuarioRepo.deleteById(id);
    }

    public List<Usuario> listarUsuarios(){
        return usuarioRepo.findAll();
    }

    public Optional<Usuario> listarUsuarioPorId(Long id){
        return usuarioRepo.findById(id);
    }
    public Optional<Usuario> listarUsuarioPorEmail(String email){
        return usuarioRepo.findByEmail(email);
    }

    public List<Usuario> listarUsuarioPorNombre(String nombre){
        return usuarioRepo.findByNombre(nombre);
    }
}
