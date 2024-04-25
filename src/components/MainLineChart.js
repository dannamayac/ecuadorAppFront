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

const createMainLineChart = (borderColor) => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [12, 15, 5, 7, 2, 3,10,8,13,4,5],
          fill: true,
          borderColor: borderColor,
          tension: 0.5,
          pointBackgroundColor: '#f4f4fb',
          pointBorderColor: borderColor,
          pointRadius: 3.5,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false
          },
          ticks: {
            display: true
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: true
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    };
  
    return (
      <div style={{ height: '200px', width: '500px' }}>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  const MainLineChart = () => createMainLineChart('#1b2f8e');
  export default MainLineChart;

  