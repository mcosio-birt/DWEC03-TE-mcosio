document.addEventListener('DOMContentLoaded', () => {
    const usuario = sessionStorage.getItem('usuarioActivo') || 'Jugador';
    const nivel = sessionStorage.getItem('nivelSeleccionado') || 'intermedio';

    // Configuración según el nivel definido previamente
    const niveles = {
        principiante: { filas: 3, cols: 3, objetivo: 100, velocidad: 1200 },
        intermedio: { filas: 4, cols: 4, objetivo: 150, velocidad: 900 },
        avanzado: { filas: 5, cols: 5, objetivo: 200, velocidad: 650 }
    };

    const config = niveles[nivel];
    let puntuacion = 0;
    let bugsEliminados = 0;
    let errores = 0;
    let tiempoRestante = 30; // Requisito expreso de la tarea

    document.getElementById('span-usuario').textContent = usuario;
    document.getElementById('span-nivel').textContent = nivel.toUpperCase();
    document.getElementById('span-puntos').textContent = `${puntuacion} / ${config.objetivo}`;
    const spanTiempo = document.getElementById('span-tiempo');

    const zonaJuego = document.getElementById('zona-juego');
    zonaJuego.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;

    // generar el tablero dinámicamente con createElement
    const totalCeldas = config.filas * config.cols;
    for (let i = 0; i < totalCeldas; i++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');

        // mouseover
        celda.addEventListener('mouseover', () => {
            celda.classList.add('hovered');
        });

        //mouseout
        celda.addEventListener('mouseout', () => {
            celda.classList.remove('hovered');
        });

        //mousedown
        celda.addEventListener('mousedown', () => {
            if (celda.classList.contains('bug')) {
                puntuacion += 10;
                bugsEliminados++;
                celda.classList.remove('bug');
            } else if (celda.classList.contains('error-item') || (!celda.classList.contains('bug'))) {
                puntuacion = Math.max(0, puntuacion - 5);
                errores++;
                celda.classList.remove('error-item');
            }

            document.getElementById('span-puntos').textContent = `${puntuacion} / ${config.objetivo}`;

            if (puntuacion >= config.objetivo) {
                finalizarPartida(true);
            }
        });

        zonaJuego.appendChild(celda);
    }

    
    const intervaloBugs = setInterval(() => {
        const celdas = document.querySelectorAll('.celda');
        celdas.forEach(c => c.classList.remove('bug', 'error-item'));

        const randIndex = Math.floor(Math.random() * celdas.length);
        const esBug = Math.random() > 0.25; // 75% probabilidad de bug, 25% distractor

        if (esBug) {
            celdas[randIndex].classList.add('bug');
        } else {
            celdas[randIndex].classList.add('error-item');
        }
    }, config.velocidad);

    // temporizador 30s
    const timer = setInterval(() => {
        tiempoRestante--;
        spanTiempo.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            finalizarPartida(puntuacion >= config.objetivo);
        }
    }, 1000);

    function finalizarPartida(ganado) {
        clearInterval(timer);
        clearInterval(intervaloBugs);

        // Guardar estado de la partida en sessionStorage
        sessionStorage.setItem('partidaGanada', ganado);
        sessionStorage.setItem('puntuacionFinal', puntuacion);
        sessionStorage.setItem('bugsFinales', bugsEliminados);
        sessionStorage.setItem('erroresFinales', errores);

        window.location.href = 'resultado.html';
    }
});