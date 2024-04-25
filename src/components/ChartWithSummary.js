import React from 'react';
import '../styles/ManagementAdministration/MetricsButtonStyles.css';

const ChartWithSummary = ({ ChartComponent, summary }) => {
    return (
      <div className="chart-with-summary">
        <div className="summary-container">
        <div className="summary-title">{summary.title}</div>
        <div className="summary-value">{summary.value}</div>
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
    );
  };
export default ChartWithSummary;
  