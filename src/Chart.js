import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Chart.css";

export function Chart({ data, secadorIndex }) {
  const formatXAxis = (tickItem) => {
    const timeParts = tickItem.split(" ")[1].split(":");
    return `${timeParts[0]}:${timeParts[1]}`;
  };

  // Calcula los valores mínimos y máximos de humedad y temperatura en los datos
  const humidityValues = data.map((entry) => entry[`s${secadorIndex + 1}h`]);
  const temperatureValues = data.map((entry) => entry[`s${secadorIndex + 1}t`]);
  const minHumidity = Math.min(...humidityValues);
  const maxHumidity = Math.max(...humidityValues);
  const minTemperature = Math.min(...temperatureValues);
  const maxTemperature = Math.max(...temperatureValues);

  return (
    <div className="line-chart">
      <h3> R% y Temperatura - Secadero {secadorIndex + 1}</h3>
      <div className="chart-container">
        <LineChart width={330} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} />
          <YAxis yAxisId="humidity" domain={[minHumidity - 5, maxHumidity + 5]} label={{ value: "Humedad (%)", angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="temperature" orientation="right" domain={[minTemperature - 2, maxTemperature + 2]} label={{ value: "Temperatura (°C)", angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Line yAxisId="humidity" type="monotone" dataKey={`s${secadorIndex + 1}h`} stroke="#8884d8" name="Humedad" activeDot={false} />
          <Line yAxisId="temperature" type="monotone" dataKey={`s${secadorIndex + 1}t`} stroke="#82ca9d" name="Temperatura" activeDot={false} />
        </LineChart>
      </div>
    </div>
  );
}
