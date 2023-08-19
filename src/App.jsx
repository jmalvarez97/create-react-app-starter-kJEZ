import React, { useState, useEffect } from "react";
import {Chart} from "./Components/Chart";
import { Toggle } from "./Components/Toggle";
import "./App.css";

function App() {
  const url = "https://expressjs-postgres-production-2fee.up.railway.app";
  // DATA
  const [lastMeasurement, setLastMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  // PAGINADORES
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSala, setCurrentSala] = useState(1);
  const [measurementsPerPage] = useState(10);
  // # DE SECADORES POR PLACA
  const secadorCount = 2;

  const lastIndex = currentPage * measurementsPerPage;
  const firstIndex = lastIndex - measurementsPerPage;
  const currentMeasurements = measurements.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetch(`${url}/api/lastMeasurement/${currentSala}`)
      .then(response => response.json())
      .then(data => setLastMeasurement(data));

      fetch(`${url}/api/last96Measurements/${currentSala}`)
      .then(response => response.json())
      .then(data => setMeasurements(data));
  }, [currentSala]);

  const last30Measurements = measurements.slice(0, 48).reverse()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Monitor de Temperatura y Humedad</h1>
        
        <Toggle
          setCurrentSala={setCurrentSala}
          currentSala={currentSala}
        />

        {lastMeasurement && (
          <div className="last-measurement">
            <h2>Última Medición</h2>
            <p>Fecha: {lastMeasurement.date}</p>
            {currentMeasurements.length > 0 && (
              <div className="measurement-row">
                {Array.from({ length: secadorCount }).map((_, index) => (
                  <div className="measurement-column" key={index}>
                    <h3>Secadero {index + currentSala}</h3>
                    <p>  H%: {lastMeasurement[`s${index + currentSala}h`]}</p>
                    <p>  C°: {lastMeasurement[`s${index + currentSala}t`]}</p>
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
                  <th>Sec. {index + currentSala} H%</th>
                  <th>Sec. {index + currentSala} C°</th>
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
                    <td>{measurement[`s${index + currentSala}h`]}</td>
                    <td>{measurement[`s${index + currentSala}t`]}</td>
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
            <Chart data={last30Measurements} secadorIndex={currentSala - 1} />
            <Chart data={last30Measurements} secadorIndex={currentSala} />
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
