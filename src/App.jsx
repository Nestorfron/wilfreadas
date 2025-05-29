import React from "react";

import Weather from "./components/Weather.jsx";
import WeatherForecast from "./components/forecast.jsx";

import "../src/styles/App.css";

function App() {
  return (
    <div className="container mx-auto">
      <div className="component-box">
        <Weather />
      </div>
      <div className="component-box">
        <WeatherForecast />
      </div>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        Este proyecto fue desarrollado por{" "}
        <a
          href="https://github.com/NestorFron"
          className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Nestor Frones
        </a>
      </p>
    </div>
  );
}

export default App;
