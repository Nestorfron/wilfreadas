import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";

const API_KEY = "db573f23fe6d4c846e2c8256945123aa";

export default function Weather() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
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

  const fetchFallbackLocation = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return { lat: data.latitude, lon: data.longitude };
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError("Error al obtener datos del clima.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCityName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.length > 0) {
        setCity(data[0].name);
      } else {
        setCity("Ubicación desconocida");
      }
    } catch (e) {
      setCity("Ubicación desconocida");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      async () => {
        try {
          const fallbackCoords = await fetchFallbackLocation();
          setCoords(fallbackCoords);
        } catch {
          setError("No se pudo obtener tu ubicación.");
          setLoading(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.lat, coords.lon);
      fetchCityName(coords.lat, coords.lon);
    }
  }, [coords]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (loading) return <p className="text-center">Cargando clima...</p>;
  if (error) return <p className="text-center">{error}</p>;
  if (!weather) return null;

  const daily = weather.daily.slice(1, 6); // 5 días siguientes
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

      <CurrentWeather weather={weather} city={city} timezoneOffset={timezoneOffset} />
      <WeatherForecast daily={daily} timezoneOffset={timezoneOffset} />
    </div>
  );
}
