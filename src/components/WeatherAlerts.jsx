import React from "react";

// Función para detectar el nivel de alerta y asignar colores
const getAlertColor = (event) => {
  const normalized = event.toLowerCase();
  if (normalized.includes("amarilla")) return "bg-yellow-300 text-yellow-900 border-yellow-600";
  if (normalized.includes("naranja")) return "bg-orange-400 text-orange-900 border-orange-600";
  if (normalized.includes("roja")) return "bg-red-500 text-red-100 border-red-700";
  return "bg-gray-200 text-gray-900 border-gray-400"; // por defecto
};

const tagToColor = {
    "Other dangers": "bg-yellow-300 text-yellow-900 border-yellow-600",
    "Extreme temperature": "bg-orange-400 text-orange-900 border-orange-600",
    "Extreme weather": "bg-red-500 text-red-100 border-red-700",
  };

export default function WeatherAlerts({ alerts = [] }) {
  const inumetAlerts = alerts.filter((alert) =>
    alert.sender_name.toLowerCase().includes("instituto uruguayo de meteorología")
  );

  if (inumetAlerts.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-green-100 text-green-900 border border-green-400 shadow">
        <p>No hay alertas activas en este momento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inumetAlerts.map((alert, index) => {
        const tag = alert.tags?.[0];
        const colorClass = tagToColor[tag] || "bg-gray-200 text-gray-900 border-gray-400";

        return (
          <div
            key={index}
            className={`p-4 rounded-xl border shadow ${colorClass}`}
          >
            <h3 className="text-lg font-bold">{alert.event}</h3>
            <p className="text-sm mt-1 whitespace-pre-line">{alert.description}</p>
            <p className="text-xs mt-2 italic">
              Desde: {new Date(alert.start * 1000).toLocaleString("es-UY")} <br />
              Hasta: {new Date(alert.end * 1000).toLocaleString("es-UY")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
