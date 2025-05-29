import React, { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiStrongWind,
  WiRaindrops,
} from "react-icons/wi";
import { FiCloud } from "react-icons/fi";

const API_KEY = "db573f23fe6d4c846e2c8256945123aa";

const weatherIconMap = {
  "01d": <WiDaySunny size={60} color="#f6d365" />,
  "01n": <WiDaySunny size={60} color="#f6d365" />,
  "02d": <WiCloudy size={60} color="#90a4ae" />,
  "02n": <WiCloudy size={60} color="#90a4ae" />,
  "03d": <WiCloudy size={60} color="#90a4ae" />,
  "03n": <WiCloudy size={60} color="#90a4ae" />,
  "04d": <WiCloudy size={60} color="#78909c" />,
  "04n": <WiCloudy size={60} color="#78909c" />,
  "09d": <WiRain size={60} color="#4fc3f7" />,
  "09n": <WiRain size={60} color="#4fc3f7" />,
  "10d": <WiRain size={60} color="#4fc3f7" />,
  "10n": <WiRain size={60} color="#4fc3f7" />,
  "11d": <WiThunderstorm size={60} color="#f44336" />,
  "11n": <WiThunderstorm size={60} color="#f44336" />,
  "13d": <WiSnow size={60} color="#81d4fa" />,
  "13n": <WiSnow size={60} color="#81d4fa" />,
  "50d": <WiFog size={60} color="#b0bec5" />,
  "50n": <WiFog size={60} color="#b0bec5" />,
};

const weatherIconMapSmall = {
  ...Object.fromEntries(
    Object.entries(weatherIconMap).map(([k, v]) => [
      k,
      React.cloneElement(v, { size: 40 }),
    ])
  ),
};

function groupByDay(list, timezoneOffset) {
  const days = {};
  list.forEach((entry) => {
    // Ajustar timestamp con timezoneOffset (ms)
    const localTimestamp = entry.dt * 1000 + timezoneOffset;
    const date = new Date(localTimestamp);

    // Crear string YYYY-MM-DD con getUTC... porque ya ajustamos timezone
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");

    const dayKey = `${year}-${month}-${day}`;
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(entry);
  });
  return Object.entries(days);
}

function WeatherForecast() {
  const [coords, setCoords] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setCoords({ lat: -34.9011, lon: -56.1645 }); // Montevideo fallback
        setError("No se obtuvo la ubicación, mostrando datos de Montevideo.");
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    async function fetchForecast() {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod !== "200") {
          setError(data.message || "Error al obtener datos.");
        } else {
          setForecastData(data);
        }
      } catch {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, [coords]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!forecastData) return null;

  const timezoneOffset = forecastData.city.timezone * 1000; // offset en ms
  const groupedDays = groupByDay(forecastData.list, timezoneOffset);

  // Obtener la fecha local "hoy" para filtrar el día actual
  const nowLocal = new Date(Date.now() + timezoneOffset);
  const todayStr = nowLocal.toISOString().split("T")[0];
  const nextDays = groupedDays.filter(([date]) => date !== todayStr).slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-light-secondary dark:text-dark-secondary mb-4">
        Pronóstico para los próximos 10 días
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {nextDays.map(([date, entries]) => {
          const temps = entries.map((e) => e.main.temp);
          const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

          // Buscar la entrada de las 12:00 (hora local)
          const noonEntry =
            entries.find((e) => {
              const localTime = new Date(e.dt * 1000 + timezoneOffset);
              return localTime.getUTCHours() === 12;
            }) || entries[0];

          const { icon, description } = noonEntry.weather[0];
          const windSpeed = noonEntry.wind.speed.toFixed(1);
          const clouds = noonEntry.clouds.all;
          const pop = Math.round(noonEntry.pop * 100);

          return (
            <div
              key={date}
              className="mx-1 bg-light-card dark:bg-dark-card rounded-xl p-4 shadow-glass flex flex-col items-center min-w-[220px]"
            >
              <h4 className="text-light-text dark:text-dark-text font-semibold mb-2">
                {new Date(date).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </h4>
              <div className="mb-2">
                {weatherIconMap[icon] || (
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={description}
                    className="w-20 h-20 drop-shadow"
                  />
                )}
              </div>
              <p className="text-light-secondary dark:text-dark-secondary text-sm mb-1">
                {description}
              </p>
              <p className="text-2xl font-bold text-light-accent dark:text-dark-accent">
                {avgTemp}°C
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs text-light-text dark:text-dark-text mt-2">
                <div className="flex items-center gap-1">
                  <WiStrongWind size={18} />
                  <span>{windSpeed} m/s</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiCloud size={18} />
                  <span>{clouds}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <WiRaindrops size={18} />
                  <span>{pop}%</span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto mt-4 w-full">
                {entries.map((hourData) => {
                  const localDate = new Date(hourData.dt * 1000 + timezoneOffset);
                  const hour = localDate.toISOString().substring(11, 16); // HH:mm

                  const tempHour = hourData.main.temp.toFixed(1);
                  const iconSmall = hourData.weather[0].icon;
                  const descHour = hourData.weather[0].description;

                  return (
                    <div
                      key={hourData.dt}
                      className="flex flex-col items-center text-xs min-w-[60px]"
                      title={`${descHour}, ${tempHour}°C a las ${hour}`}
                    >
                      <div className="mb-1">
                        {weatherIconMapSmall[iconSmall] || (
                          <img
                            src={`https://openweathermap.org/img/wn/${iconSmall}@2x.png`}
                            alt={descHour}
                            className="w-10 h-10"
                          />
                        )}
                      </div>
                      <div>{tempHour}°C</div>
                      <div>{hour}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;
