import React, { useState, useEffect } from "react";
import {Chart} from "./Chart";
import "./App.css";

function App() {
  const url = "https://expressjs-postgres-production-2fee.up.railway.app";
  const [lastMeasurement, setLastMeasurement] = useState(null);
  const [measurementsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [measurements, setMeasurements] = useState([]);
  const secadorCount = 4;

  const lastIndex = currentPage * measurementsPerPage;
  const firstIndex = lastIndex - measurementsPerPage;
  const currentMeasurements = measurements.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetch(url + "/api/lastMeasurement")
      .then(response => response.json())
      .then(data => setLastMeasurement(data));

    fetch(url + "/api/measurement")
      .then(response => response.json())
      .then(data => setMeasurements(data.reverse()));
  }, []);

  const last30Measurements = measurements.slice(0, 30).reverse()

  return (
    <div className="App">
      <header className="App-header">
        <h1>WebApp de Temperatura y Humedad</h1>
        {lastMeasurement && (
          <div className="last-measurement">
            <h2>Última Medición</h2>
            <p>Fecha: {lastMeasurement.date}</p>
            {currentMeasurements.length > 0 && (
              <div className="measurement-row">
                {Array.from({ length: secadorCount }).map((_, index) => (
                  <div className="measurement-column" key={index}>
                    <p>Secadero {index + 1} H%: {currentMeasurements[0][`s${index + 1}h`]}</p>
                    <p>Secadero {index + 1} C°: {currentMeasurements[0][`s${index + 1}t`]}</p>
                  </div>
                ))}
                
              </div>
            )}
          </div>
        )}
        <h2>Tabla de Mediciones</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              {Array.from({ length: secadorCount }).map((_, index) => (
                <React.Fragment key={index}>
                  <th>Sala {index + 1} H%</th>
                  <th>Sala {index + 1} C°</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMeasurements.map(measurement => (
              <tr key={measurement.id}>
                <td>{measurement.date}</td>
                {Array.from({ length: secadorCount }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td>{measurement[`s${index + 1}h`]}</td>
                    <td>{measurement[`s${index + 1}t`]}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={lastIndex >= measurements.length}
          >
            Siguiente
          </button>
        </div>
      </header>
        
        {measurements.length > 0 && (
          <div className="chart-container">
            <div className="chart">
            <Chart data={last30Measurements} secadorIndex={0} />
            <Chart data={last30Measurements} secadorIndex={1} />
            <Chart data={last30Measurements} secadorIndex={2} />
            <Chart data={last30Measurements} secadorIndex={3} />
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
