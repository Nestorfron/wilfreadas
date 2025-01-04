import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ValidateCI from "./script/validate.jsx";
import CalculateCI from "./script/calculate.jsx";
import escudo from "../src/assets/uruguay.png";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@nextui-org/react";


function App() {
  const [ci, setci] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [digitoVerificador, setDigitoVerificador] = useState("");
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };


  const handleValidate = () => {
    setMensaje(ValidateCI(ci).valida);
  };

  const handleCalculate = () => {
    setDigitoVerificador(CalculateCI(ci).digitoVerificador);
  };

  const handlechange = (e) => {
    setci(e.target.value);
  };

  return (
    <Card className="container color-foreground">
      <div className="mb-4 flex">
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
      <div className="input-group">
        <label htmlFor="cedula-validate">Ingrese cédula para validar:</label>
        <input
          type="text"
          id="cedula-validate"
          className="input-field"
          placeholder="4.123.456-7"
          onChange={handlechange}
        />
        <Button className="color-primary mt-2" onPress={handleValidate}>
          Validar
        </Button>
        {mensaje === true && <p className="text-success">Cédula válida</p>}
        {mensaje === false && <p className="text-danger">Cédula inválida</p>}
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
        <Button className="color-primary mt-2" onPress={handleCalculate}>
          Calcular
        </Button>
        {digitoVerificador && (
          <p className="text-success">
            Dígito verificador: {digitoVerificador}
          </p>
        )}
      </div>
      <footer className="footer mt-auto py-3 bg-light text-center">
        <p>
          &copy; 2025 CI.UY - by{" "}
          <a href="https://github.com/nestorfrones">Nestor Frones</a>
        </p>
      </footer>
    </Card>
  );
}

export default App;
