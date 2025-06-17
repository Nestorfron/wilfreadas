import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import WeatherAlerts from "./WeatherAlerts";

const API_KEY = "db573f23fe6d4c846e2c8256945123aa";

const departments = {
  Artigas: { lat: -30.4, lon: -56.5 },
  Canelones: { lat: -34.55, lon: -55.95 },
  CerroLargo: { lat: -32.33, lon: -54.18 },
  Colonia: { lat: -34.47, lon: -57.84 },
  Durazno: { lat: -33.38, lon: -56.52 },
  Flores: { lat: -33.53, lon: -56.9 },
  Florida: { lat: -34.1, lon: -56.22 },
  Lavalleja: { lat: -33.92, lon: -54.95 },
  Maldonado: { lat: -34.9, lon: -54.95 },
  Montevideo: { lat: -34.9, lon: -56.2 },
  Paysandu: { lat: -32.32, lon: -58.08 },
  RioNegro: { lat: -32.67, lon: -58.07 },
  Rivera: { lat: -30.9, lon: -55.55 },
  Rocha: { lat: -34.48, lon: -54.33 },
  Salto: { lat: -31.38, lon: -57.96 },
  SanJose: { lat: -34.34, lon: -56.71 },
  Soriano: { lat: -33.53, lon: -58.3 },
  Tacuarembo: { lat: -31.73, lon: -55.98 },
  TreintaYTres: { lat: -33.23, lon: -54.38 },
};

export default function Weather() {
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState("Montevideo");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.theme = newTheme;
  };

  const fetchWeatherByDept = async (dept) => {
    setLoading(true);
    setError("");
    try {
      const { lat, lon } = departments[dept];
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError("Error al obtener datos del clima.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByDept(selectedDept);
  }, [selectedDept]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (loading) return <p className="text-center">Cargando clima...</p>;
  if (error) return <p className="text-center">{error}</p>;
  if (!weather) return null;

  const daily = weather.daily.slice(1, 6);
  const timezoneOffset = weather.timezone_offset;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-light-bg dark:bg-dark-bg shadow-md"
        title="Cambiar tema"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <CurrentWeather
        weather={weather}
        city={selectedDept}
        departments={departments}
        selectedDept={selectedDept}
        onChangeDept={setSelectedDept}
        timezoneOffset={timezoneOffset}
      />

      {weather.alerts && weather.alerts.length > 0 && (
        <>
          <button
            onClick={() => setShowAlertsModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded shadow"
          >
            <h1 className="text-lg font-bold text-center mb-2">
              ⚠️ALERTA METEOROLÓGICA⚠️
            </h1>
          </button>

          {showAlertsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg max-w-xl w-full shadow-lg relative">
                <button
                  onClick={() => setShowAlertsModal(false)}
                  className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
                  aria-label="Cerrar"
                >
                  ×
                </button>
                <WeatherAlerts
                  alerts={weather.alerts}
                  timezoneOffset={timezoneOffset}
                />
              </div>
            </div>
          )}
        </>
      )}

      {(!weather.alerts || weather.alerts.length === 0) && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">✔ Sin alertas meteorológicas.</strong>
        </div>
      )}

      <WeatherForecast daily={daily} timezoneOffset={timezoneOffset} />
    </div>
  );
}
