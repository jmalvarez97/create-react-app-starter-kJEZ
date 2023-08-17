import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Chart.css";

export function Chart({ data, secadorIndex }) {
  return (
    <div className="line-chart">
      <h3> R% - Secadero {secadorIndex + 1}</h3>
      <div className="chart-container">
        <LineChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[40, "dataMax + 10"]} /> 
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={`s${secadorIndex + 1}h`} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
}
