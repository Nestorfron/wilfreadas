import React from 'react';

import Weather from './components/Weather.jsx';
import WeatherForecast from './components/forecast.jsx';

import '../src/styles/App.css';

function App() {
  return (
    <div className="container mx-auto">
      <div className="component-box">
        <Weather />
      </div>
      <div className="component-box">
        <WeatherForecast />
      </div>
      <p className="text-center text-light-secondary dark:text-dark-secondary mt-4">
        Este proyecto fue desarrollado por <a href="https://github.com/NestorFron" className="text-light-accent dark:text-dark-accent">Nestor Frones</a>
      </p>
    </div>
  );
}

export default App;
