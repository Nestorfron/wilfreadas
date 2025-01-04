export default function calcularDigitoVerificador(cuerpo) {
    /**
     * Calcula el dígito verificador para una cédula uruguaya.
     * @param {string} cuerpo - Número de cédula sin el dígito verificador (7 dígitos).
     * @returns {object} - Resultado del cálculo y mensajes.
     * @throws {Error} - Si el cuerpo no tiene exactamente 7 dígitos.
     */
    if (cuerpo.length !== 7 || isNaN(cuerpo)) {
        const mensajeError = `Error: El cuerpo "${cuerpo}" no es válido. Debe tener exactamente 7 dígitos.`;
        console.error(mensajeError);
        return { error: true, mensaje: mensajeError };
    }

    const pesos = [2, 9, 8, 7, 6, 3, 4];
    const suma = cuerpo
        .split("")
        .reduce((acc, num, i) => acc + parseInt(num, 10) * pesos[i], 0);

    const resto = suma % 10;
    const digitoVerificador = resto === 0 ? 0 : 10 - resto;

    const mensaje = `Cuerpo: ${cuerpo}\n` +
        `Suma ponderada: ${suma}\n` +
        `Resto: ${resto}\n` +
        `Dígito verificador: ${digitoVerificador}`;

    return { error: false, digitoVerificador, mensaje };
}

