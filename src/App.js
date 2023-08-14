import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const url = "https://expressjs-postgres-production-2fee.up.railway.app"
  const [lastMeasurement, setLastMeasurement] = useState(null);
  const [measurementsPerPage] = useState(15); // Cambia esta cantidad según prefieras
  const [currentPage, setCurrentPage] = useState(1);
  const [measurements, setMeasurements] = useState([]);
  
  // Calcula el índice del último registro de la página actual
  const lastIndex = currentPage * measurementsPerPage;
  // Calcula el índice del primer registro de la página actual
  const firstIndex = lastIndex - measurementsPerPage;
  // Obtiene los registros de la página actual
  const currentMeasurements = measurements.slice(firstIndex, lastIndex);

  useEffect(() => {
    // Aquí puedes hacer una solicitud a tu backend para obtener los datos.
    // Esta es una llamada de ejemplo usando una API ficticia.
    fetch(url + "/api/lastMeasurement")
      .then(response => response.json())
      .then(data => setLastMeasurement(data));

    fetch(url + "/api/measurement")
      .then(response => response.json())
      .then(data => setMeasurements(data.reverse()));
  }, []);

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
               <div className="measurement-column">
                 <p>s1 Humedad: {currentMeasurements[0].s1h}</p>
                 <p>s1 Temperatura: {currentMeasurements[0].s1t}</p>
               </div>
               <div className="measurement-column">
                 <p>s2 Humedad: {currentMeasurements[0].s2h}</p>
                 <p>s2 Temperatura: {currentMeasurements[0].s2t}</p>
               </div>
             </div>
           )}
         </div>
        )}
        <h2>Tabla de Mediciones</h2>
        <table>
  <thead>
    <tr>
      <th>Fecha</th>
      <th>s1 Humedad</th>
      <th>s1 Temperatura</th>
      <th>s2 Humedad</th>
      <th>s2 Temperatura</th>
    </tr>
  </thead>
  <tbody>
    {currentMeasurements.map(measurement => (
      <tr key={measurement.id}>
        <td>{measurement.date}</td>
        <td>{measurement.s1h}</td>
        <td>{measurement.s1t}</td>
        <td>{measurement.s2h}</td>
        <td>{measurement.s2t}</td>
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
    </div>
  );
}

export default App;
