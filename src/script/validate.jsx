export default function validarCedulaUruguaya(cedula) {
    /**
     * Valida una cédula de identidad uruguaya.
     * @param {string} cedula - Cédula con o sin puntos y guión.
     * @returns {boolean} - True si es válida, False en caso contrario.
     */
    // Eliminar puntos y guión
    cedula = cedula.replace(/\./g, "").replace(/-/g, "");

    // Verificar longitud
    if (cedula.length !== 8 || isNaN(cedula)) {
        console.log(`Cédula inválida: "${cedula}" no tiene el formato correcto.`);
        return false;
    }

    // Separar el dígito verificador
    const cuerpo = cedula.slice(0, -1);
    const digitoVerificador = parseInt(cedula.slice(-1), 10);

    // Calcular el dígito verificador esperado
    const pesos = [2, 9, 8, 7, 6, 3, 4];
    const suma = cuerpo
        .split("")
        .reduce((acc, num, i) => acc + parseInt(num, 10) * pesos[i], 0);

    const resto = suma % 10;
    const digitoCalculado = resto === 0 ? 0 : 10 - resto;

    // Comparar el dígito calculado con el proporcionado
    const esValida = digitoCalculado === digitoVerificador;


    const mensaje = `Cédula: ${cedula}\n` +
    `Dígito proporcionado: ${digitoVerificador}\n` +
    `Dígito calculado: ${digitoCalculado}\n` +
    `Resultado: ${esValida ? "Válida" : "Inválida"}`;

    return { valida: esValida, mensaje };
}

