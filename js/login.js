import { cargarJSON } from '../cargar-datos.js';

document.addEventListener('DOMContentLoaded', () => {
    // Cargar credenciales json a localStorage si no existen
    cargarJSON('./usuarios.json', datos => {
        if (!localStorage.getItem('jsonUsuarios')) {
            localStorage.setItem('jsonUsuarios', JSON.stringify(datos));
        }
    });

    const formLogin = document.getElementById('form-login');
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');
    const mensajeError = document.getElementById('mensaje-error');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        mensajeError.textContent = '';

        const userVal = inputUsuario.value.trim();
        const passVal = inputPassword.value.trim();

        // Validar que la contraseña SOLO contenga alfanuméricos usando RegExp
        const regexAlfanumerico = /^[a-zA-Z0-9]+$/;
        if (!regexAlfanumerico.test(passVal)) {
            mensajeError.textContent = ' Error: La contraseña solo puede contener caracteres alfanuméricos (letras y números).';
            return;
        }

        // Verificar contra localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem('jsonUsuarios')) || [];
        const usuarioValido = usuariosGuardados.find(
            u => u.usuario === userVal && u.contraseña === passVal
        );

        if (usuarioValido) {
            sessionStorage.setItem('usuarioActivo', usuarioValido.usuario);
            window.location.href = 'bienvenida.html';
        } else {
            mensajeError.textContent = ' Usuario o contraseña incorrectos.';
        }
    });
});