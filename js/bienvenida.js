document.addEventListener('DOMContentLoaded', () => {
    const selectNivel = document.getElementById('nivel-select');
    const btnIniciar = document.getElementById('btn-iniciar');

    // guardar el nivel
    sessionStorage.setItem('nivelSeleccionado', selectNivel.value);

    selectNivel.addEventListener('change', (e) => {
        sessionStorage.setItem('nivelSeleccionado', e.target.value);
    });

    btnIniciar.addEventListener('click', () => {
        window.location.href = 'juego.html';
    });
});