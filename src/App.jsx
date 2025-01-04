import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ValidateCI from "./script/validate.jsx";
import CalculateCI from "./script/calculate.jsx";
import escudo from "../src/assets/uruguay.png";

function App() {
  const [ci, setci] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [digitoVerificador, setDigitoVerificador] = useState("");

  const handleValidate = (e) => {
    e.preventDefault();
    setMensaje(ValidateCI(ci).valida);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setDigitoVerificador(CalculateCI(ci).digitoVerificador);
  };

  const handlechange = (e) => {
    setci(e.target.value);
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="container">
          <div className="mb-4 text-center">
            <img
              className="img-fluid"
              src={escudo}
              alt="Escudo de Uruguay"
            />
            <h1 className="title">CI.UY</h1>
            <p className="lead">
              Una aplicación para validar y calcular el dígito
              verificador de una cédula de identidad uruguaya.
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="cedula-validate">
              Ingrese cédula para validar:
            </label>
            <input
              type="text"
              id="cedula-validate"
              className="input-field"
              placeholder="4.123.456-7"
              onChange={handlechange}
            />
            <button className="btn btn-validate" onClick={handleValidate}>
              Validar
            </button>
            {mensaje === true && <p className="text-success">Cédula válida</p>}
            {mensaje === false && (
              <p className="text-danger">Cédula inválida</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="cedula-calculate">Ingrese los 7 dígitos:</label>
            <input
              type="text"
              id="cedula-calculate"
              className="input-field"
              placeholder="4123456"
              onChange={handlechange}
            />
            <button className="btn btn-calculate" onClick={handleCalculate}>
              Calcular
            </button>
            {digitoVerificador && (
              <p className="text-success">
                Dígito verificador: {digitoVerificador}
              </p>
            )}
          </div>
          <footer className="footer mt-auto py-3 bg-light text-center">
            <p>
              &copy; 2025 CI.UY - by <a href="https://github.com/nestorfrones">Nestor Frones</a>
            </p>
          </footer>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
