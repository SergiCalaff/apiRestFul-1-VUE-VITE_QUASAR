package com.fullstack1.backend.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fullstack1.backend.models.Usuario;
import com.fullstack1.backend.repositories.IUsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final IUsuarioRepository usuarioRepo;

    public Usuario crearUsuario(Usuario usuario) {

        if (usuarioRepo.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con este email.");
        }
        return usuarioRepo.save(usuario);
    }

    public Usuario actualizarUsuario(Long id, Usuario usuario) {

        Usuario usuarioExiste = usuarioRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se ha encontrado al usuario con id: " + id));

        usuarioExiste.setNombre(usuario.getNombre());
        usuarioExiste.setEmail(usuario.getEmail());
        usuarioExiste.setPassword(usuario.getPassword());

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
