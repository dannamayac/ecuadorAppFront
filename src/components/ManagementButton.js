import React from 'react';
import '../styles/ManagementAdministration/ManagementButtonStyles.css'


const ManagementButton = ({ title, summary, ChartComponent, onClick, fullWidthButton }) => {
  return (
    <button className="small-box" onClick={onClick}>
      <div className="button-title">{title}</div>
      <div className="content-container">
        <div className="summary-container">
          <div className="summary-title">Resumen</div>
          <div className="summary-value">{summary}</div>
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
      <div className={`sub-button ${fullWidthButton ? "sub-button-full" : ""}`}>
        Gestionar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
      </div>
    </button>
  );
};

export default ManagementButton;