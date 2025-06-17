import React from "react";
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
import { FiWind, FiDroplet, FiEye, FiMapPin } from "react-icons/fi";

const iconMap = {
  "01d": <WiDaySunny size={100} className="text-yellow-400" />,
  "01n": <WiDaySunny size={100} className="text-yellow-400" />,
  "02d": <WiCloudy size={100} className="text-gray-400" />,
  "02n": <WiCloudy size={100} className="text-gray-400" />,
  "03d": <WiCloudy size={100} className="text-gray-500" />,
  "03n": <WiCloudy size={100} className="text-gray-500" />,
  "04d": <WiCloudy size={100} className="text-gray-600" />,
  "04n": <WiCloudy size={100} className="text-gray-600" />,
  "09d": <WiRain size={100} className="text-blue-400" />,
  "09n": <WiRain size={100} className="text-blue-400" />,
  "10d": <WiRain size={100} className="text-blue-500" />,
  "10n": <WiRain size={100} className="text-blue-500" />,
  "11d": <WiThunderstorm size={100} className="text-purple-600" />,
  "11n": <WiThunderstorm size={100} className="text-purple-600" />,
  "13d": <WiSnow size={100} className="text-blue-200" />,
  "13n": <WiSnow size={100} className="text-blue-200" />,
  "50d": <WiFog size={100} className="text-gray-400" />,
  "50n": <WiFog size={100} className="text-gray-400" />,
};

function formatTime(timestamp, timezoneOffset) {
  const date = new Date(timestamp * 1000);
  const offsetMinutes = timezoneOffset / 60;
  const localDate = new Date(date.getTime() + offsetMinutes * 60 * 1000);

  const hours = localDate.getUTCHours().toString().padStart(2, "0");
  const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatHour(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  return `${hours}:00`;
}

export default function CurrentWeather({
  weather,
  departments,
  selectedDept,
  onChangeDept,
}) {
  const current = weather.current;
  const hourly = weather.hourly.slice(0, 24);
  const timezoneOffset = weather.timezone_offset;

  const currentIcon =
    iconMap[current.weather[0].icon] || (
      <img
        src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
        alt={current.weather[0].description}
        className="w-20 h-20"
      />
    );

  return (
    <div className="p-8 rounded-2xl shadow-lg bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-gray-800 dark:to-gray-900 text-white max-w-xl mx-auto">
      {/* Selector de departamento */}
      {departments && (
        <div className="mb-4 flex items-center gap-2">
           <FiMapPin className="text-xl" />
          <select
            value={selectedDept}
            onChange={(e) => onChangeDept(e.target.value)}
            className="text-black rounded px-3 py-2 bg-white shadow-md dark:bg-white"
          >
            {Object.keys(departments).map((dept) => (
              <option key={dept} value={dept}>
                {dept.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-8 mb-6">
        <div className="flex-shrink-0">{currentIcon}</div>
        <div className="space-y-1">
          <p className="text-6xl font-extrabold drop-shadow-md">
            {Math.round(current.temp)}°C
          </p>
          <p className="text-lg font-semibold drop-shadow-sm">
            Sensación térmica: {Math.round(current.feels_like)}°C
          </p>
          <p className="text-base drop-shadow-sm">Humedad: {current.humidity}%</p>
          <p className="text-base drop-shadow-sm">Viento: {current.wind_speed} m/s</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6 text-center text-white text-xl sm:text-2xl mb-6">
        <div title="Amanecer" className="flex flex-col items-center">
          <WiSunrise className="text-yellow-300 drop-shadow-md" />
          <span className="mt-1 text-sm sm:text-base">
            {formatTime(current.sunrise, timezoneOffset)}
          </span>
        </div>
        <div title="Atardecer" className="flex flex-col items-center">
          <WiSunset className="text-orange-400 drop-shadow-md" />
          <span className="mt-1 text-sm sm:text-base">
            {formatTime(current.sunset, timezoneOffset)}
          </span>
        </div>
        <div title="Visibilidad" className="flex flex-col items-center">
          <FiEye className="text-cyan-200 drop-shadow-md" />
          <span className="mt-1 text-sm sm:text-base">
            {(current.visibility / 1000).toFixed(1)} km
          </span>
        </div>
        <div title="Punto de rocío" className="flex flex-col items-center">
          <FiDroplet className="text-blue-200 drop-shadow-md" />
          <span className="mt-1 text-sm sm:text-base">
            {current.dew_point.toFixed(1)}°C
          </span>
        </div>
        <div title="Presión" className="flex flex-col items-center">
          <FiWind className="text-green-200 drop-shadow-md" />
          <span className="mt-1 text-sm sm:text-base">{current.pressure} hPa</span>
        </div>
        <div title="Índice UV" className="flex flex-col items-center">
          <span className="font-bold text-lg">UV</span>
          <span className="mt-1 text-sm sm:text-base">{current.uvi}</span>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 pb-2">
        <div className="flex gap-4 min-w-max">
          {hourly.map((hour, i) => {
            const icon =
              iconMap[hour.weather[0].icon] || (
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                  className="w-10 h-10"
                />
              );

            const hourLabel = formatHour(hour.dt, timezoneOffset);

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-3 py-2 bg-white/10 rounded-lg shadow-inner text-center text-sm"
              >
                <span className="mb-1 font-semibold">{hourLabel}</span>
                {icon}
                <span className="mt-1 text-lg font-bold">
                  {Math.round(hour.temp)}°C
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
