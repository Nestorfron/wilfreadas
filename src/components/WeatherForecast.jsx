import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const iconMap = {
  "01d": <WiDaySunny size={72} className="text-yellow-400" />,
  "01n": <WiDaySunny size={72} className="text-yellow-400" />,
  "02d": <WiCloudy size={72} className="text-gray-400" />,
  "02n": <WiCloudy size={72} className="text-gray-400" />,
  "03d": <WiCloudy size={72} className="text-gray-500" />,
  "03n": <WiCloudy size={72} className="text-gray-500" />,
  "04d": <WiCloudy size={72} className="text-gray-600" />,
  "04n": <WiCloudy size={72} className="text-gray-600" />,
  "09d": <WiRain size={72} className="text-blue-400" />,
  "09n": <WiRain size={72} className="text-blue-400" />,
  "10d": <WiRain size={72} className="text-blue-500" />,
  "10n": <WiRain size={72} className="text-blue-500" />,
  "11d": <WiThunderstorm size={72} className="text-purple-600" />,
  "11n": <WiThunderstorm size={72} className="text-purple-600" />,
  "13d": <WiSnow size={72} className="text-blue-200" />,
  "13n": <WiSnow size={72} className="text-blue-200" />,
  "50d": <WiFog size={72} className="text-gray-400" />,
  "50n": <WiFog size={72} className="text-gray-400" />,
};

export default function WeatherForecast({ daily, timezoneOffset }) {
  return (
    <div className="p-8 rounded-2xl shadow-lg bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text max-w-5xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-6 border-b border-light-accent/50 dark:border-dark-accent/50 pb-3">
        Próximos días
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {daily.map((day, i) => {
          const icon =
            iconMap[day.weather[0].icon] || (
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-14 h-14 mx-auto"
              />
            );

          const date = new Date((day.dt + timezoneOffset) * 1000);
          const dayName = date.toLocaleDateString("es-ES", {
            weekday: "long",
          });
          const dateStr = date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-5 rounded-xl bg-light-bg dark:bg-dark-bg shadow-glass hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              title={day.weather[0].description}
            >
              {icon}
              <div className="text-center space-y-1">
                <p className="capitalize text-lg font-semibold">
                  {dayName}
                </p>
                <p className="text-sm text-light-secondary dark:text-dark-secondary">
                  {dateStr}
                </p>
                <p className="text-base font-medium">
                  Máx: {Math.round(day.temp.max)}°C / Mín: {Math.round(day.temp.min)}°C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
