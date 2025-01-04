import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ValidateCI from "./script/validate.jsx";
import CalculateCI from "./script/calculate.jsx";
import escudo from "../src/assets/uruguay.png";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button, Card, Link, Input } from "@nextui-org/react";

function App() {
  const [ci, setci] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [errorCalc, setErrorCalc] = useState("");
  const [digitoVerificador, setDigitoVerificador] = useState("");
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  const handleValidate = () => {
    if (ValidateCI(ci).valida) {
      setMensaje(ValidateCI(ci).valida);
      setError("");
    } else {
      setError(ValidateCI(ci));
      setMensaje("");
    }
  };

  const handleCalculate = () => {
    if (CalculateCI(ci).digitoVerificador) {
      setDigitoVerificador(CalculateCI(ci).digitoVerificador);
      setErrorCalc("");
    } else {
      setErrorCalc(CalculateCI(ci));
      setDigitoVerificador("");
    }
  };

  const handlechange = (e) => {
    setci(e.target.value);
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
      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa cédula para validar:"
          placeholder="4.123.456-7"
          type="text"
          onChange={handlechange}
        />
        <Button size="lg" color="default" className="mt-2" onPress={handleValidate}>  
          Validar
        </Button>
        {mensaje === true && <p className="text-success mt-2">Cédula válida</p>}
        {mensaje === false && (
          <p className="text-danger mt-2">Cédula inválida</p>
        )}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa los 7 dígitos:"
          placeholder="4123456"
          type="text"
          onChange={handlechange}
        />
        <Button size="lg" color="default" className="mt-2" onPress={handleCalculate}>
          Calcular
        </Button>
        {digitoVerificador && (
          <p className="text-success mt-2">
            Dígito verificador: {digitoVerificador}
          </p>
        )}
        {errorCalc && <p className="text-danger mt-2">{errorCalc}</p>}
      </div>
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
