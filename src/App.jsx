import React, { useState } from "react";
import { useTheme } from "next-themes";
import ValidateCI from "./script/validate.jsx";
import CalculateCI from "./script/calculate.jsx";
import escudo from "../src/assets/uruguay.png";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button, Card, Link, Input } from "@nextui-org/react";

function App() {
  const [ci, setCi] = useState(""); // Para almacenar la cédula completa
  const [digitos, setDigitos] = useState(""); // Para almacenar los 7 dígitos
  const [mensaje, setMensaje] = useState(""); // Mensaje de validación de cédula
  const [error, setError] = useState(""); // Error de validación de cédula
  const [errorCalc, setErrorCalc] = useState(""); // Error de cálculo
  const [digitoVerificador, setDigitoVerificador] = useState(""); // Resultado del dígito verificador
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  const handleValidate = () => {
    const result = ValidateCI(ci);
    if (result.valida === true) {
      setMensaje("Cédula válida");
      setError("");
    } else {
      setError(result.mensaje || "Cédula inválida");
      setMensaje("");
    }
  };

  const handleCalculate = () => {
    const result = CalculateCI(digitos);
    if (result.digitoVerificador !== undefined) {
      // Asegúrate de que el valor 0 sea tratado correctamente
      setDigitoVerificador(result.digitoVerificador);
      setErrorCalc(""); // Limpia cualquier mensaje de error previo
    } else {
      setErrorCalc("Error al calcular el dígito verificador");
      setDigitoVerificador(""); // Limpiar dígito verificador si hay error
    }
  };

  const handleCiChange = (e) => {
    setCi(e.target.value);
  };

  const handleDigitosChange = (e) => {
    setDigitos(e.target.value);
  };

  return (
    <Card className="container color-foreground">
      <div className="mb-2 flex">
        <Button className="ms-auto" variant="outline" onPress={toggleTheme}>
          {isDark ? (
            <SunIcon className="h-6 w-6" color="primary" variant="shadow" />
          ) : (
            <MoonIcon className="h-6 w-6" color="primary" variant="light" />
          )}
        </Button>
      </div>
      <div className="mb-4 text-center">
        <img className="img-fluid" src={escudo} alt="Escudo de Uruguay" />
        <h1 className="title">CI.UY</h1>
        <p className="lead">
          Una aplicación para validar y calcular el dígito verificador de una
          cédula de identidad uruguaya.
        </p>
      </div>

      {/* Sección de validación de cédula */}
      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa cédula para validar:"
          placeholder="4.123.456-7"
          type="text"
          value={ci}
          onChange={handleCiChange}
        />
        <Button size="lg" color="default" className="mt-2" onPress={handleValidate}>
          Validar
        </Button>
        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      {/* Sección de cálculo de dígito verificador */}
      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa los 7 dígitos:"
          placeholder="4123456"
          type="text"
          value={digitos}
          onChange={handleDigitosChange}
        />
        <Button size="lg" color="default" className="mt-2" onPress={handleCalculate}>
          Calcular
        </Button>
        {digitoVerificador !== "" && ( // Asegúrate de mostrar 0 correctamente
          <p className="text-success mt-2">
            Dígito verificador: {digitoVerificador}
          </p>
        )}
        {errorCalc && <p className="text-danger mt-2">{errorCalc}</p>}
      </div>

      {/* Pie de página */}
      <footer className="footer mt-auto py-3 bg-light text-center">
        <p>
          &copy; 2025 CI.UY - by{" "}
          <Link
            isBlock
            showAnchorIcon
            color="primary"
            href="https://github.com/Nestorfron"
          >
            Nestor Frones
          </Link>
        </p>
      </footer>
    </Card>
  );
}

export default App;
