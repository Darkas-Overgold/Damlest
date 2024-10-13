import React, { useEffect, useState } from 'react';
import '../App.css';
function App() {
  const [progress, setProgress] = useState(0);
  // Simulación del progreso durante 24 horas
  useEffect(() => {
    const totalDuration = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const intervalDuration = 1000; // Actualizar cada segundo
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (intervalDuration / totalDuration) * 100;
        if (newProgress >= 100) {
          clearInterval(interval); // Detener cuando llegue al 100%
          return 100;
        }
        return newProgress;
      });
    }, intervalDuration);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container">
      {/* Imagen de error */}
      <div className="damlest-error">
        <img src="#" alt="Error" />
      </div>
      {/* Animación de carga */}
      <div className="damlest-loading">
        <img src="#" alt="Loading" />
        {/* Animación del círculo giratorio */}
        <div className="loading-animation">
          <div className="circle-container">
            <div className="circle"></div>
          </div>
        </div>
        {/* Texto de "Cargando..." */}
        <div className="loading-text">Cargando...</div>
        {/* Barra de progreso de 24 horas */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="progress-label">24 HORAS</div>
        </div>
        <img src="#" alt="Loading2" />
      </div>
    </div>
  );
}
export default App;