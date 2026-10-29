document.addEventListener('DOMContentLoaded', () => {
    const ganado = sessionStorage.getItem('partidaGanada') === 'true';
    const usuario = sessionStorage.getItem('usuarioActivo') || 'Jugador';
    const nivel = sessionStorage.getItem('nivelSeleccionado') || 'intermedio';
    const puntuacion = sessionStorage.getItem('puntuacionFinal') || 0;
    const bugs = sessionStorage.getItem('bugsFinales') || 0;
    const errores = sessionStorage.getItem('erroresFinales') || 0;

    const titulo = document.getElementById('titulo-resultado');
    const resumen = document.getElementById('resumen-resultado');

    if (ganado) {
        titulo.textContent = "¡YOU WIN! 🎉";
        titulo.style.color = "#40c075";
    } else {
        titulo.textContent = "¡GAME OVER! 😢";
        titulo.style.color = "#e74c3c";
    }

    resumen.innerHTML = `
        <p><strong>Jugador:</strong> ${usuario}</p>
        <p><strong>Nivel superado/intentado:</strong> ${nivel.toUpperCase()}</p>
        <p><strong>Puntuación Final:</strong> ${puntuacion} puntos</p>
        <p><strong>Bugs aplastados:</strong> ${bugs}</p>
        <p><strong>Errores/Fallos cometidos:</strong> ${errores}</p>
    `;

    document.getElementById('btn-reintentar').addEventListener('click', () => {
        window.location.href = 'bienvenida.html';
    });

    document.getElementById('btn-salir').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
});