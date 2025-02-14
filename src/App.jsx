import React, { useState } from "react";
import { useTheme } from "next-themes";
import ValidateCI from "./script/validate.jsx";
import CalculateCI from "./script/calculate.jsx";
import escudo from "../src/assets/uruguay.png";
import { MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Card, Link, Input } from "@nextui-org/react";

function App() {
  const [ci, setCi] = useState("");
  const [digitos, setDigitos] = useState("");
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
      setDigitoVerificador(result.digitoVerificador);
      setErrorCalc("");
    } else {
      setErrorCalc("Error al calcular el dígito verificador");
      setDigitoVerificador("");
    }
  };

  const handleClear = () => {
    setCi("")
    setDigitos("")
    setMensaje("")
    setError("")
    setErrorCalc("")
    setDigitoVerificador("")
  }

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
        <p className="lead my-5">Una aplicación para validar número de cédula de identidad uruguaya o calcular dígito verificador.</p>
      </div>

      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa cédula para validar:"
          placeholder="4.123.456-7"
          type="text"
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          endContent={
            ci && (
              <button onClick={() => handleClear()} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            )
          }
        />
        <Button 
          isDisabled={ci === ""}
          size="lg" 
          className={`mt-2 ${mensaje ? 'bg-green-600 text-white' : error ? 'bg-red-600 text-white' : 'bg-default'}`} 
          onPress={handleValidate}
        >
          {ci === "" ? "Ingresa cédula" : "Validar"}
        </Button>
        {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <div className="input-group">
        <Input
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          label="Ingresa los 7 dígitos:"
          placeholder="4123456"
          type="text"
          value={digitos}
          onChange={(e) => setDigitos(e.target.value)}
          endContent={
            digitos && (
              <button onClick={() => handleClear()} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            )
          }
        />
        <Button 
          isDisabled={digitos === ""}
          size="lg" 
          className={`mt-2 ${digitoVerificador !== "" ? 'bg-green-600 text-white' : errorCalc ? 'bg-red-600 text-white' : 'bg-default'}`} 
          onPress={handleCalculate}
        >
          {digitos === "" ? "Ingresa los digitos" : "Validar"}
        </Button>
        {digitoVerificador !== "" && (<p className="text-green-600 mt-2">Dígito verificador: {digitoVerificador}</p>)}
        {errorCalc && <p className="text-red-600 mt-2">{errorCalc}</p>}
      </div>

      <footer className="footer mt-auto py-3 bg-light text-center">
        <p>
          &copy; 2025 CI.UY - by {" "}
          <Link isBlock showAnchorIcon color="primary" href="https://github.com/Nestorfron">Nestor Frones</Link>
        </p>
      </footer>
    </Card>
  );
}

export default App;
