import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Chart.css";

export function Chart({ data, secadorIndex }) {
  const formatXAxis = (tickItem) => {
    const timeParts = tickItem.split(" ")[1].split(":");
    return `${timeParts[0]}:${timeParts[1]}`;
  };

  return (
    <div className="line-chart">
      <h3> R% - Secadero {secadorIndex + 1}</h3>
      <div className="chart-container">
        <LineChart width={330} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} />
          <YAxis domain={["dataMin - 10", "dataMax + 10"]} /> 
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={`s${secadorIndex + 1}h`} stroke="#8884d8" activeDot={false} />
        </LineChart>
      </div>
    </div>
  );
}
