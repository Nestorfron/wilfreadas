import React, { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { FiWind, FiDroplet, FiEye, FiMoon, FiSun } from "react-icons/fi";

const API_KEY = "db573f23fe6d4c846e2c8256945123aa";

// Función actualizada para mostrar la hora local del lugar usando offset
function formatTime(timestamp, timezoneOffsetInSeconds) {
  const date = new Date((timestamp + timezoneOffsetInSeconds) * 1000);
  const offsetInMinutes = timezoneOffsetInSeconds / 60;
  const offsetFormatted = `UTC${offsetInMinutes >= 0 ? "+" : ""}${offsetInMinutes / 60}`;

  return new Intl.DateTimeFormat("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
    timeZoneName: "shortOffset",
  }).format(date).replace("UTC", offsetFormatted); // Formato más limpio
}

const iconMap = {
  "01d": <WiDaySunny size={100} />,
  "01n": <WiDaySunny size={100} />,
  "02d": <WiCloudy size={100} />,
  "02n": <WiCloudy size={100} />,
  "03d": <WiCloudy size={100} />,
  "03n": <WiCloudy size={100} />,
  "04d": <WiCloudy size={100} />,
  "04n": <WiCloudy size={100} />,
  "09d": <WiRain size={100} />,
  "09n": <WiRain size={100} />,
  "10d": <WiRain size={100} />,
  "10n": <WiRain size={100} />,
  "11d": <WiThunderstorm size={100} />,
  "11n": <WiThunderstorm size={100} />,
  "13d": <WiSnow size={100} />,
  "13n": <WiSnow size={100} />,
  "50d": <WiFog size={100} />,
  "50n": <WiFog size={100} />,
};

export default function Weather() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(
    () => localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.theme = newTheme;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por el navegador.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("Permiso de ubicación denegado o error: " + err.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        setError("Error al obtener datos del clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (loading)
    return <p className="text-center text-light-text dark:text-dark-text">Cargando clima...</p>;
  if (error)
    return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;
  if (!weather) return null;

  const iconCode = weather.weather[0].icon;
  const iconElement =
    iconMap[iconCode] || (
      <img
        alt={weather.weather[0].description}
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        className="w-24 h-24"
      />
    );

  return (
    <div className="relative max-w-md my-6 mx-auto p-6 rounded-3xl shadow-glass bg-light-card text-light-text dark:bg-dark-card dark:text-dark-text transition-colors duration-500">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-light-bg dark:bg-dark-bg shadow-md hover:scale-105 transition-transform"
        title="Cambiar tema"
      >
        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <h2 className="text-2xl font-bold text-center mb-2">
        Clima en {weather.name}, {weather.sys.country}
      </h2>
      <p className="text-center text-light-secondary dark:text-dark-secondary capitalize mt-4">
        {weather.weather[0].description}
      </p>

      <div className="flex justify-center mb-4">{iconElement}</div>
      <p className="text-5xl font-extrabold text-light-accent dark:text-dark-accent text-center mb-2">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="text-center font-medium text-light-secondary dark:text-dark-secondary mb-6">
        Sensación térmica: {Math.round(weather.main.feels_like)}°C
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm font-medium text-center">
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          <FiWind /> {weather.wind.speed} m/s, {weather.wind.deg}°
        </div>
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          <FiDroplet /> Humedad: {weather.main.humidity}%
        </div>
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          Presión: {weather.main.pressure} hPa
        </div>
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          <FiEye /> Visibilidad: {(weather.visibility / 1000).toFixed(1)} km
        </div>
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          <WiSunrise /> {formatTime(weather.sys.sunrise, weather.timezone)}
        </div>
        <div className="flex items-center justify-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-2">
          <WiSunset /> {formatTime(weather.sys.sunset, weather.timezone)}
        </div>
      </div>
    </div>
  );
}
