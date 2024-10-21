document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const botonesNumeros = document.querySelectorAll('button[data-numero]');
    const botonesOperadores = document.querySelectorAll('button[data-operador]');
    const botonIgual = document.getElementById('igual');
    const botonLimpiar = document.getElementById('limpiar');

    let valorActual = '';
    let valorAnterior = '';
    let operador = '';

    botonesNumeros.forEach(boton => {
        boton.addEventListener('click', () => {
            agregarNumero(boton.getAttribute('data-numero'));
        });
    });

    botonesOperadores.forEach(boton => {
        boton.addEventListener('click', () => {
            seleccionarOperacion(boton.getAttribute('data-operador'));
        });
    });

    botonIgual.addEventListener('click', () => {
        calcular();
    });

    botonLimpiar.addEventListener('click', () => {
        limpiar();
    });

    function agregarNumero(num) {
        if (num === '.' && valorActual.includes('.')) return;
        valorActual += num;
        actualizarDisplay();
    }

    function actualizarDisplay() {
        display.value = valorActual;
    }

    function seleccionarOperacion(op) {
        if (valorActual === '') return;
        if (valorAnterior !== '') {
            calcular();
        }
        operador = op;
        valorAnterior = valorActual;
        valorActual = '';
    }

    function calcular() {
        let resultado;
        const anterior = parseFloat(valorAnterior);
        const actual = parseFloat(valorActual);

        if (isNaN(anterior) || isNaN(actual)) return;

        switch (operador) {
            case '+':
                resultado = anterior + actual;
                break;
            case '-':
                resultado = anterior - actual;
                break;
            case '*':
                resultado = anterior * actual;
                break;
            case '/':
                resultado = anterior / actual;
                break;
            default:
                return;
        }

        valorActual = resultado.toString();
        operador = '';
        valorAnterior = '';
        actualizarDisplay();
    }

    function limpiar() {
        valorActual = '';
        valorAnterior = '';
        operador = '';
        actualizarDisplay();
    }
});
