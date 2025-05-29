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
    </div>
  );
}

export default App;
