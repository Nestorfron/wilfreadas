import React, { useEffect, useState } from 'react';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiStrongWind,
  WiRaindrops,
} from 'react-icons/wi';
import { FiCloud } from 'react-icons/fi';

import styles from '../styles/Forecast.module.css';

const API_KEY = 'db573f23fe6d4c846e2c8256945123aa';

const weatherIconMap = {
  '01d': <WiDaySunny size={60} color="#f6d365" />,
  '01n': <WiDaySunny size={60} color="#f6d365" />,
  '02d': <WiCloudy size={60} color="#90a4ae" />,
  '02n': <WiCloudy size={60} color="#90a4ae" />,
  '03d': <WiCloudy size={60} color="#90a4ae" />,
  '03n': <WiCloudy size={60} color="#90a4ae" />,
  '04d': <WiCloudy size={60} color="#78909c" />,
  '04n': <WiCloudy size={60} color="#78909c" />,
  '09d': <WiRain size={60} color="#4fc3f7" />,
  '09n': <WiRain size={60} color="#4fc3f7" />,
  '10d': <WiRain size={60} color="#4fc3f7" />,
  '10n': <WiRain size={60} color="#4fc3f7" />,
  '11d': <WiThunderstorm size={60} color="#f44336" />,
  '11n': <WiThunderstorm size={60} color="#f44336" />,
  '13d': <WiSnow size={60} color="#81d4fa" />,
  '13n': <WiSnow size={60} color="#81d4fa" />,
  '50d': <WiFog size={60} color="#b0bec5" />,
  '50n': <WiFog size={60} color="#b0bec5" />,
};

const weatherIconMapSmall = {
  '01d': <WiDaySunny size={40} color="#f6d365" />,
  '01n': <WiDaySunny size={40} color="#f6d365" />,
  '02d': <WiCloudy size={40} color="#90a4ae" />,
  '02n': <WiCloudy size={40} color="#90a4ae" />,
  '03d': <WiCloudy size={40} color="#90a4ae" />,
  '03n': <WiCloudy size={40} color="#90a4ae" />,
  '04d': <WiCloudy size={40} color="#78909c" />,
  '04n': <WiCloudy size={40} color="#78909c" />,
  '09d': <WiRain size={40} color="#4fc3f7" />,
  '09n': <WiRain size={40} color="#4fc3f7" />,
  '10d': <WiRain size={40} color="#4fc3f7" />,
  '10n': <WiRain size={40} color="#4fc3f7" />,
  '11d': <WiThunderstorm size={40} color="#f44336" />,
  '11n': <WiThunderstorm size={40} color="#f44336" />,
  '13d': <WiSnow size={40} color="#81d4fa" />,
  '13n': <WiSnow size={40} color="#81d4fa" />,
  '50d': <WiFog size={40} color="#b0bec5" />,
  '50n': <WiFog size={40} color="#b0bec5" />,
};

function groupByDay(list) {
  const days = {};
  list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];
    if (!days[dayKey]) {
      days[dayKey] = [];
    }
    days[dayKey].push(entry);
  });
  return Object.entries(days);
}

function WeatherForecast() {
  const [coords, setCoords] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        setError('Error con la ubicación: ' + err.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    async function fetchForecast() {
      setLoading(true);
      setError('');
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== '200') {
          setError(data.message || 'Error al obtener datos.');
        } else {
          setForecastData(data);
        }
      } catch {
        setError('No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [coords]);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!forecastData) return null;

  const groupedDays = groupByDay(forecastData.list);

  const todayStr = new Date().toISOString().split('T')[0];
  const nextDays = groupedDays.filter(([date]) => date !== todayStr).slice(0, 5);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {forecastData.city.name}, {forecastData.city.country}
      </h2>

      <h3 className={styles.subtitle}>Pronóstico para los próximos 5 días</h3>

      <div className={styles.gridDays}>
        {nextDays.map(([date, entries]) => {
          const temps = entries.map((e) => e.main.temp);
          const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

          const noonEntry =
            entries.find((e) => new Date(e.dt * 1000).getHours() === 12) || entries[0];
          const icon = noonEntry.weather[0].icon;
          const description = noonEntry.weather[0].description;
          const windSpeed = noonEntry.wind.speed.toFixed(1);
          const clouds = noonEntry.clouds.all;
          const pop = Math.round(noonEntry.pop * 100);

          return (
            <div key={date} className={styles.card}>
              <h4 className={styles.cardTitle}>
                {new Date(date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                })}
              </h4>

              <div className={styles.iconWrapper}>
                {weatherIconMap[icon] || (
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={description}
                    style={{
                      width: 80,
                      height: 80,
                      filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
                    }}
                  />
                )}
              </div>

              <p className={styles.description}>{description}</p>

              <p className={styles.avgTemp}>{avgTemp}°C</p>

              <div className={styles.statsGrid}>
                <div className={styles.statItem} title="Velocidad del viento">
                  <WiStrongWind size={20} color="#264653" />
                  <span>{windSpeed} m/s</span>
                </div>

                <div className={styles.statItem} title="Nubosidad">
                  <FiCloud size={20} color="#264653" />
                  <span>{clouds}%</span>
                </div>

                <div className={styles.statItem} title="Probabilidad de lluvia">
                  <WiRaindrops size={20} color="#264653" />
                  <span>{pop}%</span>
                </div>
              </div>

              <div className={styles.hourlyScroll}>
                {entries.map((hourData) => {
                  const hour = new Date(hourData.dt * 1000).getHours();
                  const tempHour = hourData.main.temp.toFixed(1);
                  const iconSmall = hourData.weather[0].icon;
                  const descHour = hourData.weather[0].description;

                  return (
                    <div
                      key={hourData.dt}
                      className={styles.hourItem}
                      title={`${descHour}, ${tempHour}°C a las ${hour}:00`}
                    >
                      <div style={{ marginBottom: 4 }}>
                        {weatherIconMapSmall[iconSmall] || (
                          <img
                            src={`https://openweathermap.org/img/wn/${iconSmall}@2x.png`}
                            alt={descHour}
                            style={{ width: 40, height: 40 }}
                          />
                        )}
                      </div>
                      <div className={styles.hourTemp}>{tempHour}°C</div>
                      <div className={styles.hourLabel}>{hour}:00</div>
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
