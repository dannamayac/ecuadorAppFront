import React from 'react';
import ChartWithSummary from './ChartWithSummary';
import '../styles/ManagementAdministration/MetricsButtonStyles.css'; // Asegúrate de tener este archivo de estilos

const MetricsButton = ({ title, summary, mainChart: MainChart, subCharts, subSummaries, onClick }) => {
    return (
      <div className="custom-metric-button" onClick={onClick}>
        <div className="metrics-title">{title}</div>
        <div className="main-chart">
          <MainChart />
        </div>
        <div className="sub-charts-summary-container">
            {subCharts.map((Chart, index) => (
            <ChartWithSummary 
                key={index} 
                ChartComponent={Chart} 
                summary={subSummaries[index]}
            />
            ))}
        </div>
        <div className="action-button">
          Ver más &nbsp;&nbsp;&gt;
        </div>
      </div>
    );
  };

export default MetricsButton;