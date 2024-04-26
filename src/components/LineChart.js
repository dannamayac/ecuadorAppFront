import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// La función toma el color de la línea como argumento
const createLineChart = (borderColor) => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        tension: 0.5,
        borderColor: borderColor,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div style={{ height: '50px', width: '160px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

// Ahora puedes usar createLineChart para generar gráficos con colores diferentes
const LineChartGreen = () => createLineChart('#1fcb4f');
const LineChartRed = () => createLineChart('red');
const LineChartYellow = () => createLineChart('yellow');
const LineChartAquamarine = () => createLineChart('#36DDE7');

export { LineChartGreen, LineChartRed, LineChartYellow, LineChartAquamarine };