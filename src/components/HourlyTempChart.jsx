import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function HourlyTempChart({ hourly, timezoneOffset }) {
  const hours = hourly.slice(0, 12);

  const labels = hours.map((h) => {
    const date = new Date((h.dt + timezoneOffset) * 1000);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const temps = hours.map((h) => h.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temps,
        fill: true,
        backgroundColor: "rgba(255, 202, 40, 0.15)", // color claro con opacidad
        borderColor: "#ffca28",
        tension: 0.4,
        pointBackgroundColor: "#ffca28",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ffca28",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#d1d5db", // text-gray-300
          font: { size: 14 },
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
      x: {
        ticks: {
          color: "#d1d5db",
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#f3f4f6",
          font: { weight: "bold" },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} °C`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-light-text dark:text-dark-text">
        Temperatura por hora
      </h3>
      <div className="h-72 sm:h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
